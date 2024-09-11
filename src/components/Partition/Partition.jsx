import { useState } from "react";
import { generateId, getRandomColor } from "../../utils/utils";

// eslint-disable-next-line react/prop-types
const Partition = ({ id, color, removeSelf, isRoot, zIndex }) => {
  const [isSplit, setIsSplit] = useState(false);
  const [splitDirection, setSplitDirection] = useState("");
  const [partitions, setPartitions] = useState([]);
  const [currentZIndex, setCurrentZIndex] = useState(zIndex);

  const splitPartition = (direction) => {
    setIsSplit(true);
    setSplitDirection(direction);

    setPartitions([
      { id: generateId(), color, zIndex: currentZIndex + 10 },
      { id: generateId(), color: getRandomColor(), zIndex: currentZIndex + 20 },
    ]);
  };

  const handleRemove = () => {
    removeSelf(id);
  };

  return (
    <div
      className={`flex relative border m-[1px] flex-1`}
      style={{
        flexDirection: splitDirection === "vertical" ? "row" : "column",
        backgroundColor: color,
      }}
    >
      {!isSplit ? (
        <div className="flex items-center justify-center w-full h-full">
          <button
            className="border px-2 text-white"
            onClick={() => splitPartition("vertical")}
          >
            V
          </button>
          <button
            className="border px-2 text-white"
            onClick={() => splitPartition("horizontal")}
          >
            H
          </button>
        </div>
      ) : (
        partitions.map((partition, index) => (
          <Partition
            key={partition.id}
            id={partition.id}
            color={partition.color}
            zIndex={partition.zIndex}
            isRoot={index === 0}
            removeSelf={(idToRemove) => {
              setPartitions(partitions.filter((p) => p.id !== idToRemove));
              if (partitions.length === 1) {
                setIsSplit(false);
              }
            }}
          />
        ))
      )}

      {isRoot && (
        <button
          className={`absolute top-1 right-1 bg-red-700 text-white border-none px-2 cursor-pointer ${currentZIndex}`}
          onClick={handleRemove}
        >
          -
        </button>
      )}
    </div>
  );
};

export default Partition;
