import CloudUploadIcon from "@mui/icons-material/CloudUpload";


function Upload({setCookies}) {

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = (e) => {
    //   console.log("e.target.result", e.target.result);
      setCookies(e.target.result);
    };
  };
    return (
      <label
        className="
        w-64
        flex flex-col
        items-center
        px-4
        py-6
        bg-white
        rounded-md
        shadow-md
        tracking-wide
        uppercase
        border border-blue
        cursor-pointer
        hover:bg-blue-600 hover:text-white
        text-blue-600
        ease-linear
        transition-all
        duration-150
    "
      >
        <CloudUploadIcon />
        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input type="file" onChange={handleChange} className="hidden" />
      </label>
    );
}

export default function CookiesPage({cookies, setCookies}) {

    return (
      <>
        <div className="flex flex-col justify-center items-center mx-10 space-y-3 my-5">
          <Upload setCookies={setCookies} />
          <div
            className="break-words border border-blue bg-white
        rounded-md
        shadow-md
        px-4
        py-6
        w-10/12
        "
          >
            <h1 className="uppercase text-center"> Current Cookies </h1>
            <br />
            {cookies}
          </div>
        </div>
      </>
    );
}
