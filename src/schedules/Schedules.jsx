import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const Schedules = () => {
  const [closer, setCloser] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { handleSubmit: submitCloser, handleChange } = useFormik({
    initialValues: {
      closer: "",
    },
    onSubmit: ({ closer }) => {
      setCloser(closer);
    },
  });

  const {
    handleSubmit: updateSubmit,
    getFieldProps,
    resetForm,
  } = useFormik({
    initialValues: {
      row: 0,
      state: "",
    },
    onSubmit: async ({ row, state }) => {
      const request = await fetch(
        "https://back-mycontent-test.vercel.app/api/schedules",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ row: row, state: state, closer: closer }),
        }
      );

      if (request.status === 200) {
        const { msg } = await request.json();
        Swal.fire({
          title: "Registro Actualizado!",
          background: "#6c5cf8",
          color: "white",
          icon: "success",
          confirmButtonColor: "#382a85",
          iconColor: "white",
          text: msg,
        });
        unShowForm();
        resetForm();
      } else {
        const { msg } = await request.json();
        Swal.fire({
          title: "Error al actualizar registro!",
          background: "#6c5cf8",
          color: "white",
          icon: "error",
          confirmButtonColor: "#382a85",
          iconColor: "white",
          text: msg,
        });
      }
    },
  });

  const unShowForm = () => {
    setShowForm(false);
    setCloser("");
  };
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-6xl text-center font-bold pb-10 pt-8 text-white">
          MyContent.
        </h1>
        <h2 className="text-4xl text-center font-semibold mb-10 text-white">
          Bienvenido al gestor de estados de Google Sheets
        </h2>
        <h3 className="text-3xl text-center font-semibold mb-16 text-white">
          Que acción desea realizar?
        </h3>
        <div className="flex flex-col items-center gap-10 justify-center">
          <button
            className="bg-pink-700 p-4 text-white rounded-lg text-2xl hover:bg-[#412aa9]"
            onClick={() => setShowForm(true)}
          >
            Actualizar Estado del Lead
          </button>

          <Link
            to="/changes"
            className="bg-pink-700 p-4 text-white rounded-lg text-2xl hover:bg-[#412aa9]"
          >
            Revisar Registro de Cambios
          </Link>
        </div>
      </div>

      {showForm && !closer.length && (
        <div className="flex flex-col w-[500px] h-[300px] rounded-lg absolute top-0 left-0 right-0 m-auto bottom-0 bg-[#412aa9]">
          <button
            className="text-start ms-2 text-2xl text-bold w-fit hover:text-white"
            onClick={unShowForm}
          >
            X
          </button>
          <form
            className="text-white flex flex-col items-center justify-center gap-12"
            onSubmit={submitCloser}
          >
            <h4 className="text-2xl">Cual es tu nombre Closer?</h4>
            <select
              name="closer"
              className="text-black p-2 rounded"
              required
              onChange={handleChange}
            >
              <option disabled value="" selected>
                Selecciona una opción...
              </option>
              <option value="Juanjo">Juanjo</option>
              <option value="rodri">Rodri</option>
            </select>
            <input
              type="submit"
              className="text-xl bg-[#22184e] p-3 rounded-lg cursor-pointer hover:bg-pink-700"
              value="OK"
            />
          </form>
        </div>
      )}

      {closer.length !== 0 && (
        <div className="flex flex-col h-[400px] w-[500px]  rounded-lg absolute top-0 left-0 right-0 m-auto bottom-0 bg-[#412aa9]">
          <button
            className="text-start ms-2 text-2xl text-bold w-fit hover:text-white"
            onClick={unShowForm}
          >
            X
          </button>
          <form
            className="text-white flex flex-col items-center justify-between gap-10"
            onSubmit={updateSubmit}
          >
            <h4 className="text-2xl">Que registro quieres actualizar?</h4>
            <h4 className="text-xl">
              Ingresa su fila y estado correspondiente
            </h4>
            <div className="flex gap-3 items-center ">
              <label className="text-lg">Número de fila</label>
              <input
                type="number"
                min={1}
                className="text-black p-1 rounded"
                required
                {...getFieldProps("row")}
              />
            </div>
            <div className="flex gap-3 items-center">
              <label className="text-lg">Estado</label>
              <select
                {...getFieldProps("state")}
                required
                className="text-black p-2 rounded"
              >
                <option value="" disabled selected>
                  Selecciona una opción...
                </option>
                <option value="Lose">Lose</option>
                <option value="Contactado">Contactado</option>
                <option value="Esperando respuesta">Esperando respuesta</option>
                <option value="En llamada">En llamada</option>
                <option value="Win">Win</option>
              </select>
            </div>
            <input
              type="submit"
              className="text-xl bg-[#22184e] p-3 rounded-lg cursor-pointer hover:bg-pink-700"
            />
          </form>
        </div>
      )}
    </>
  );
};
