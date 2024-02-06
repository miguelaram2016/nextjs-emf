import { useState, useEffect, useRef } from 'react';

const SquatFreeBody = () => {
  const svgRef = useRef(null);
  const yAxis = {x: 150, y1: 0, y2: 400}
  const [ankleJointPosition, setAnkleJointPosition] = useState({ x: yAxis.x -20, y: 350 });
  const [kneeJointPosition, setKneeJointPosition] = useState({ x: yAxis.x + 50, y: 250 });
  const [hipJointPosition, setHipJointPosition] = useState({ x: yAxis.x -100, y: 250 });
  const [neckJointPosition, setNeckJointPosition] = useState({ x: yAxis.x + 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [draggedJoint, setDraggedJoint] = useState('');
  const [load, setLoad] = useState(100);
  const [hipForce, setHipForce] = useState(0);
  const [kneeForce, setKneeForce] = useState(0);
  const [hipMoment, setHipMoment] = useState(0);
  const [kneeMoment, setKneeMoment] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const svgRect = svgRef.current.getBoundingClientRect();
      const newJointX = e.clientX - svgRect.left;
      const newJointY = e.clientY - svgRect.top;

      switch (draggedJoint) {
        case 'ankle':
          setAnkleJointPosition({ x: newJointX, y: newJointY });
          break;
        case 'knee':
          if (newJointX >= hipJointPosition.x && newJointY >= 0) {

          setKneeJointPosition({ x: newJointX, y: kneeJointPosition.y });
          }
          break;
        case 'hip':
          setHipJointPosition({ x: newJointX, y: hipJointPosition.y });
          break;
        case 'neck':
          setNeckJointPosition({ x: newJointX, y: newJointY });
          break;
        default:
          break;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDraggedJoint('');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, draggedJoint, kneeJointPosition, hipJointPosition]);

  const handleJointMouseDown = (joint) => {
    setIsDragging(true);
    setDraggedJoint(joint);
  };

  const calculateLength = (point1, point2) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    const distance = (Math.sqrt(dx * dx + dy * dy) / 3).toFixed(2);
    return distance;
  };

  const calculateDistance = (point1, point2) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    const distance = (Math.sqrt(dx * dx + dy * dy) / 3).toFixed(2);
    return `${distance} cm`;
  };

  const handleLoadChange = (e) => {
    setLoad(e.target.value);
  };

  const calculateSmallerAngle = (joint1, joint2, joint3) => {
    const vector1 = {
      x: joint1.x - joint2.x,
      y: joint1.y - joint2.y,
    };
  
    const vector2 = {
      x: joint3.x - joint2.x,
      y: joint3.y - joint2.y,
    };
  
    const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
    const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
    const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
  
    const cosine = dotProduct / (magnitude1 * magnitude2);
    const angleInRadians = Math.acos(cosine);
    const angleInDegrees = (angleInRadians * 180) / Math.PI;
  
    return angleInDegrees;
  };

  const calculateMomentArm = (joint1, joint2, joint3) => {
    const vector1 = {
      x: joint1.x - joint2.x,
      y: joint1.y - joint2.y,
    };
  
    const vector2 = {
      x: joint3.x - joint2.x,
      y: joint3.y - joint2.y,
    };
  
    const crossProduct = vector1.x * vector2.y - vector1.y * vector2.x;
    const magnitude = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
  
    // Calculate the moment arm
    const momentArm = crossProduct / magnitude;
  
    return momentArm;
  };
  
  
  
  
  useEffect(() => {
    const calculateForces = () => {
      const hipDistance = calculateLength(hipJointPosition, neckJointPosition);
      const kneeDistance = calculateLength(kneeJointPosition, hipJointPosition);
      const kneeAngle = calculateSmallerAngle(ankleJointPosition, kneeJointPosition, hipJointPosition);
      const hipAngle = calculateSmallerAngle(kneeJointPosition, hipJointPosition, neckJointPosition);

      // Calculate force
      const force = load * 9.81;

      // Calculate forces at the hip and knee joints
      const hipForce = (force * (1 + Math.cos(hipAngle)));
      const kneeForce = (force * (1 + Math.cos(kneeAngle)));

      setHipForce(hipForce.toFixed(2));
      setKneeForce(kneeForce.toFixed(2));

      const hipMomentArm = calculateMomentArm(kneeJointPosition, hipJointPosition, neckJointPosition);
      const kneeMomentArm = calculateMomentArm(ankleJointPosition, kneeJointPosition, hipJointPosition);

      setHipMoment(hipMomentArm.toFixed(2));
      setKneeMoment(kneeMomentArm.toFixed(2));
    };

    calculateForces();
  }, [load, ankleJointPosition, hipJointPosition, kneeJointPosition, neckJointPosition]);

  return (
    <div className='bg-white my-10 rounded-xl'>
      <h1 className='text-black font-bold text-xl'>Squat Free Body Diagram</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'white' }}>
        <svg width="400" height="400" ref={svgRef}>
          {/* Feet */}
          <line
            x1={ankleJointPosition.x} y1={ankleJointPosition.y} x2={170} y2={350} stroke="black" strokeWidth={3}
          />
          {/* Ankle joint */}
          <circle cx={ankleJointPosition.x} cy={ankleJointPosition.y} r={5} fill="black"
            onMouseDown={() => handleJointMouseDown('ankle')}
          />
          {/* Ankle distance label */}
          <text x={ankleJointPosition.x + 10} y={ankleJointPosition.y - 10} fill="black">
            {calculateDistance(ankleJointPosition, { x: 170, y: 350 })}
          </text>

          {/* Lower Leg */}
          <line
            x1={ankleJointPosition.x} y1={ankleJointPosition.y} x2={kneeJointPosition.x} y2={kneeJointPosition.y} stroke="black" strokeWidth={3}
          />
          {/* Knee joint */}
          <circle
            cx={kneeJointPosition.x} cy={kneeJointPosition.y} r={5} fill="black"
            onMouseDown={() => handleJointMouseDown('knee')}
          />
          {/* Knee distance label */}
          <text x={(ankleJointPosition.x + kneeJointPosition.x) / 2} y={(ankleJointPosition.y + kneeJointPosition.y) / 2 - 10} fill="black">
            {calculateDistance(ankleJointPosition, kneeJointPosition)}
          </text>

          {/* Upper Leg */}
          <line
            x1={kneeJointPosition.x} y1={kneeJointPosition.y} x2={hipJointPosition.x} y2={hipJointPosition.y} stroke="black" strokeWidth={3}
          />
          {/* Hip joint */}
          <circle
            cx={hipJointPosition.x} cy={hipJointPosition.y} r={5} fill="black"
            onMouseDown={() => handleJointMouseDown('hip')}
          />
          {/* Hip distance label */}
          <text x={(kneeJointPosition.x + hipJointPosition.x) / 2} y={(kneeJointPosition.y + hipJointPosition.y) / 2 - 10} fill="black">
            {calculateDistance(kneeJointPosition, hipJointPosition)}
          </text>

          {/* Body */}
          <line
            x1={hipJointPosition.x} y1={hipJointPosition.y} x2={neckJointPosition.x} y2={neckJointPosition.y} stroke="black" strokeWidth={3}
          />

          {/* Head */}
          <circle
            cx={neckJointPosition.x} cy={neckJointPosition.y} r={20} fill="black"
            onMouseDown={() => handleJointMouseDown('neck')}
          />
          {/* Neck distance label */}
          <text x={(hipJointPosition.x + neckJointPosition.x) / 2} y={(hipJointPosition.y + neckJointPosition.y) / 2 - 10} fill="black">
            {calculateDistance(hipJointPosition, neckJointPosition)}
          </text>

          {/* Y-Axis */}
          <line x1={yAxis.x} y1={0} x2={yAxis.x} y2={400} stroke="black" strokeWidth={1} />
        </svg>
        <div className='text-black '>
          <h1 className='font-bold'>Legend</h1>
          <p className='my-5'>Torso: {calculateDistance(hipJointPosition, neckJointPosition)} <br /> Length between Head/Neck and Hip</p>
          <p className='my-5'>Femur: {calculateDistance(kneeJointPosition, hipJointPosition)} <br /> Length between Hip and Knee</p>
          <p className='my-5'>Shin: {calculateDistance(ankleJointPosition, kneeJointPosition)} <br /> Length between Knee and Ankle</p>
          <p className='my-5'> Foot: {calculateDistance(ankleJointPosition, { x: 220, y: 350 })} <br /> Length between Ankle and Toes</p>
        </div>
      </div>
      <div className='flex justify-center mt-4'>
        <label className='text-black font-bold mr-2'>Load (kg):</label>
        <input
          type='number'
          min='0'
          step='any'
          value={load}
          onChange={handleLoadChange}
          className='px-2 py-1 border border-gray-400 rounded'
        />
      </div>
      <div className='flex justify-center mt-4'>
        <p className='text-black'>
          Hip Force: {hipForce} N
          <br />
          Knee Force: {kneeForce} N
        </p>
      </div>
      <div className='flex justify-center mt-4'>
        <p className='text-black'>
          Hip Moment: {hipMoment} Nm
          <br />
          Knee Moment: {kneeMoment} Nm
        </p>
      </div>
    </div>
  );
};

export default SquatFreeBody;
