import { WorkoutBlock } from './workoutUtils';
import { trainingBlocks } from '../constants';

const TrainingPrograms = () => {
  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-3xl my-10">Training Programs (in progress)</h1>
      <div className="grid grid-cols-1 gap-4">
        {trainingBlocks.map((trainingBlock, index) => (
          <WorkoutBlock key={index} trainingBlock={trainingBlock} />
        ))}
      </div>
    </div>
  )
}

export default TrainingPrograms