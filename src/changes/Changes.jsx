import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Changes = () => {
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    fetch("https://back-mycontent-test.vercel.app/api/schedules/changes")
      .then((res) => res.json())
      .then((data) => setChanges(data.changes))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col">
      <Link to="/" className="ms-5 text-3xl mt-2 text-white font-bold absolute">
        {"<- Ir al inicio"}
      </Link>
      <div className="text-white flex justify-content-center items-center flex-col">
        <h1 className="text-6xl font-bold pb-10 pt-8">MyContent.</h1>
        <h2 className="text-3xl font-semibold mb-10">
          Registro de cambios en el Google Sheets
        </h2>
        <div className="flex flex-col gap-10 mx-20 items-center max-h-[700px] px-20 overflow-auto ">
          {changes.length ? (
            changes.map(({ _id, message, date }) => (
              <div
                key={_id}
                className="flex justify-center bg-pink-700 p-3 gap-5 rounded-xl text-lg"
              >
                <p>{message}</p>
                <p>
                  {`${date.split("T")[0]} ${date.split("T")[1].slice(0, 5)}`}
                </p>
              </div>
            ))
          ) : (
            <h2 className="text-3xl font-semibold mt-5">
              Todavía no realizaste ningún cambio!
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};
