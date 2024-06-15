import Link from 'next/link';

export default function ViewBookChapters() {
   return (
      <article className="prose flex w-full flex-col">
         <h1 className="place-self-center text-2xl font-bold">Ascendance of a Bookworm Part 1 Volume 1</h1>
         <div className="divider"></div>
         <div className="card grid h-20 place-items-center">
            <form>
               <div className="join">
                  <label className="input join-item input-bordered flex items-center gap-2">
                     <input type="text" className="grow" placeholder="Search" />
                  </label>
                  <select className="join-item select select-bordered" defaultValue={'empty'}>
                     <option disabled value={'empty'}>
                        Filter
                     </option>
                     <option>Ascending</option>
                     <option>Descending</option>
                  </select>
                  <div className="indicator">
                     <button className="badge indicator-item">x</button>
                     <button className="btn join-item btn-neutral">Apply</button>
                  </div>
               </div>
               <Link href="/books/add" className="btn btn-neutral ml-3" prefetch={true}>
                  Add new book
               </Link>
            </form>
         </div>
         <div className="divider"></div>
         <div className="grid">
            <table className="table">
               {/* head */}
               <thead>
                  <tr>
                     <th></th>
                     <th>Chapter</th>
                     <th>Progress</th>
                     <th>Status</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="hover">
                     <th>1</th>
                     <td>Ascendance of a Bookworm Part 1 Volume 1</td>
                     <td>READ</td>
                     <td>ONGOING</td>
                     <td>
                        <div className="dropdown dropdown-hover">
                           <div tabIndex={0} role="button" className="btn m-1">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth="1.5"
                                 stroke="currentColor"
                                 className="size-6"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                 />
                              </svg>
                           </div>
                           <ul
                              tabIndex={0}
                              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                           >
                              <li>
                                 <Link href="/book/1/1/edit" prefetch={true}>
                                    Edit
                                 </Link>
                              </li>
                              <li>
                                 <Link href="/book/1/1" prefetch={true}>
                                    Read
                                 </Link>
                              </li>
                              <li>
                                 <Link href="/book/1/1/delete" prefetch={true}>
                                    Delete
                                 </Link>
                              </li>
                           </ul>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </article>
   );
}
