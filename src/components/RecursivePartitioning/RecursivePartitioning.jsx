import { useState } from "react";
import { generateId, getRandomColor } from "../../utils/utils";
import Partition from "../Partition/Partition";

const RecursivePartitioning = () => {
  const [rootPartitions, setRootPartitions] = useState([
    { id: generateId(), color: getRandomColor(), zIndex: 10 },
  ]);

  //   --- handle add partition at the root level ---
  const addPartition = () => {
    const maxZIndex = Math.max(...rootPartitions.map((p) => p.zIndex));
    setRootPartitions([
      ...rootPartitions,
      { id: generateId(), color: getRandomColor(), zIndex: maxZIndex + 1 },
    ]);
  };

  //   --- handle remove partition ---
  const removePartition = (idToRemove) => {
    setRootPartitions(rootPartitions.filter((p) => p.id !== idToRemove));
  };
  return (
    <div className="h-[90vh] w-full flex overflow-hidden m-0 relative">
      {rootPartitions.map((partition, index) => (
        <Partition
          key={partition.id}
          id={partition.id}
          color={partition.color}
          zIndex={partition.zIndex}
          isRoot={index === 0}
          removeSelf={removePartition}
        />
      ))}
      <button
        className="absolute bottom-2 left-2 bg-blue-600 text-white py-1 px-2 border-none z-50"
        onClick={addPartition}
      >
        Add Partition
      </button>
    </div>
  );
};

export default RecursivePartitioning;
