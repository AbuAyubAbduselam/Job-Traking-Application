import { useSubmit, Link } from "react-router-dom";
import { JOB_SORT_BY, CLASSES } from "../../../utils/constant";
import { useAllStudentsContext } from "../pages/AllStudents";

const SearchContainer2 = () => {
  const { selectedParams, setSelectedParams } = useAllStudentsContext();
  const { search, classes, sort } = selectedParams;

  const submit = useSubmit();

  const debounce = (callback, delay = 1000) => {
    let timeoutId;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(form);
      }, delay);
    };
  };

  const handleReset = () => {
    const resetParams = {
      search: "",
      classes: "all",
      sort: "newest",
    };
    setSelectedParams(resetParams);
    submit();
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h5 className="text-lg font-bold mb-4">Search Form</h5>
      <form className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
        <div className="form-control flex-1">
          <input
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => submit(form))}
            placeholder="Search"
            className="input input-bordered bg-white w-full"
          />
        </div>

        <div className="form-control flex-1">
          <div className="flex items-center space-x-2">
            <label className="label w-20" htmlFor="classes">
              <span className="label-text">Class</span>
            </label>
            <select
              id="classes"
              name="classes"
              defaultValue={classes}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
              className="select select-bordered bg-white w-full"
            >
              {["all", ...Object.values(CLASSES)].map((clas) => (
                <option key={clas} value={clas}>
                  {clas}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-control flex-1">
          <div className="flex items-center space-x-2">
            <label className="label w-20" htmlFor="sort">
              <span className="label-text">Sort By</span>
            </label>
            <select
              id="sort"
              name="sort"
              defaultValue={sort}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
              className="select select-bordered bg-white w-full"
            >
              {Object.values(JOB_SORT_BY).map((sortBy) => (
                <option key={sortBy} value={sortBy}>
                  {sortBy}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-control">
          <Link
            to="/dashboard/all-students"
            className="btn btn-error w-full lg:w-auto"
            onClick={handleReset}
          >
            Reset
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SearchContainer2;
