export default function BookForm() {
   return (
      <>
         <p className="py-4">
            If the book name and the series name are the same, you can leave this field empty. If left empty, it will
            automatically be filled with the book name upon saving.
         </p>
         <label className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" className="grow" placeholder="Ascendance of a Bookworm Part 1 Volume 1" />
         </label>
         <label className="input input-bordered flex items-center gap-2">
            Author
            <input list="book-author-list" type="text" className="grow" placeholder="Miya Kazuki" />
            <datalist id="book-author-list">
               <option value="Miya Kazuki"></option>
            </datalist>
         </label>

         <select className="select select-bordered w-full" defaultValue="empty">
            <option value="empty" disabled>
               Status
            </option>
            <option>COMPLETED</option>
            <option>ONGOING</option>
            <option>CANCELED</option>
         </select>

         <label className="input input-bordered flex items-center gap-2">
            <input list="book-series-list" type="text" className="grow" placeholder="Book Series" />
            <kbd className="kbd kbd-xs">Optional</kbd>
            <datalist id="book-series-list">
               <option value="Chocolate"></option>
               <option value="Coconut"></option>
               <option value="Mint"></option>
               <option value="Strawberry"></option>
               <option value="Vanilla"></option>
            </datalist>
         </label>

         <div className="modal-action">
            <button className="btn btn-primary">Save</button>
         </div>
      </>
   );
}
