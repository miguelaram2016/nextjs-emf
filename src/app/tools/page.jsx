import Tools from './Tools';
import TrainingPrograms from './TrainingPrograms';
import SearchExercises from './trainingUtils/SearchExercises';
import CreateExercise from './trainingUtils/CreateExercise';


const ToolsPage = () => {
  return (
    <main className="container mx-auto">
      <Tools />

      <SearchExercises />
      <CreateExercise />
      <TrainingPrograms />
    </main>
  );
};

export default ToolsPage;
