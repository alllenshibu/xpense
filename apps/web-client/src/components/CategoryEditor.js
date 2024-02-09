export default function CategoryEditor({ category, setCategory, submitText, handleSubmit }) {
  return (
    <form
      className="w-full md:w-2/5 flex flex-col gap-4"
      onChange={(e) => {
        e.preventDefault();
        setCategory({ ...category, [e.target.name]: e.target.value });
      }}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" value={category.name} placeholder="Travel" />
      </div>
      <div>
        <button onClick={handleSubmit} type="submit" className="w-auto btn btn-primary">
          {submitText ? submitText : 'Submit'}
        </button>
      </div>
    </form>
  );
}
