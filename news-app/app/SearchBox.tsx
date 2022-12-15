
const SearchBox = () => {
  return (
    <form className="max-w-6xl mx-auto justify-between flex items-center px-5">
      <input
        placeholder="Search Keywords..."
        className="flex-1 w-full h-14 rounded-sm placeholder-gray-500 text-gray-500 
        outline-none bg-transparent dark:text-orange-400" 
        type="text" />
        <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
