import { useState } from "react";

export default function () {
  const [potsList, setPostList] = useState([]);
  const [post, setPost] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [category, setCategory] = useState(false);
  const [tags, setTags] = useState([]);

  // TODO refactoring handleTitle/handleImage/handleContent
  //create a link between input text and state
  function handleTitle(e) {
    if (post.id) {
      setPost({
        id: post.id,
        title: e.target.value,
        image: post.image ?? "",
        content: post.content ?? "",
        category: post.category,
      });
    } else {
      setPost({
        title: e.target.value,
        image: post.image ?? "",
        content: post.content ?? "",
        category: post.category,
      });
    }
  }
  //create a link between input text and state
  function handleImage(e) {
    if (post.id) {
      setPost({
        id: post.id,
        image: e.target.value,
        title: post.title ?? "",
        content: post.content ?? "",
        category: post.category,
      });
    } else {
      setPost({
        image: e.target.value,
        title: post.title ?? "",
        content: post.content ?? "",
        category: post.category,
      });
    }
  }
  //create a link between input text and state
  function handleContent(e) {
    if (post.id) {
      setPost({
        content: e.target.value,
        id: post.id,
        title: post.title ?? "",
        image: post.image ?? "",
        category: post.category,
      });
    } else {
      setPost({
        content: e.target.value,
        title: post.title ?? "",
        image: post.image ?? "",
        category: post.category,
      });
    }
  }
  //create a link between input select and state
  function handleCategory(e) {
    if (post.id) {
      setPost({
        ...post,
        category: e.target.value,
      });
      setCategory(e.target.value);
    } else {
      setPost({
        ...post,
        category: e.target.value,
      });
      setCategory(e.target.value);
    }
  }
  //create a link between input checkbox and state
  function handleTags(e) {
    // const currentTags = [...tags];
    // if (currentTags.includes(e.target.value)) {
    //   if (post.id) {
    //     setPost({
    //       ...post,
    //       tags: e.target.value,
    //     });
    //   } else {
    //     setPost({
    //       ...post,
    //       tags: e.target.value,
    //     });
    //   }
    // }
  }

  //create a function to change state of poslist
  function handlePostList(e) {
    e.preventDefault();
    setPostList((postList) => {
      const newPostList = [...postList];

      newPostList.push({
        id: Date.now(),
        title: post.title,
        image: post.image,
        content: post.content,
        category: post.category,
      });

      return newPostList;
    });

    setPost("");
    setCategory("");
  }
  //create a function to menage edit post
  function handleEditPost(id) {
    setEditMode(true);
    setPostList((postlist) => {
      const newpostlist = [...postlist];

      const currentpost = newpostlist.filter((post) => {
        return post.id == id;
      });

      //   console.log(currentpost[0].title);
      setPost({
        id: currentpost[0].id,
        title: currentpost[0].title,
        image: currentpost[0].image,
        content: currentpost[0].content,
        category: currentpost[0].category,
      });

      setCategory(() => currentpost[0].category);

      return newpostlist;
    });
  }

  //create function that add edit post in the postlist
  function addEditPost(e) {
    e.preventDefault();
    setPostList((postlist) => {
      const oldPostList = [...postlist];
      if (post.id) {
        const newPostList = oldPostList.map((item) =>
          item.id == post.id ? post : item
        );
        setPost("");
        setCategory("");
        setEditMode(false);
        console.log(newPostList);
        return newPostList;
      }
      return oldPostList;
    });
  }

  //create a function to delete post in a postlist
  function deletePost(id) {
    setPostList((postList) => {
      const newPostList = [...postList];

      return newPostList.filter((post) => id != post.id);
    });
  }

  return (
    <>
      <div className="form_container w-screen h-screen p-5">
        <form
          className="px-4 py-2 bg-sky-300 rounded-2xl flex flex-col"
          onSubmit={editMode === false ? handlePostList : addEditPost}
        >
          <label htmlFor="title" className="py-3 font-bold">
            Title
          </label>
          <input
            className="title_input outline-0 rounded-xl px-3"
            id="title"
            type="text"
            value={post.title ?? ""}
            onChange={handleTitle}
            name="title"
            placeholder="Inserisci il titolo del post"
          />
          <label htmlFor="image" className="py-3 font-bold">
            image
          </label>
          <input
            className="title_input outline-0 rounded-xl px-3"
            id="image"
            type="text"
            value={post.image ?? ""}
            onChange={handleImage}
            name="image"
            placeholder="Inserisci il titolo del post"
          />
          <label htmlFor="content" className="py-3 font-bold">
            Description
          </label>
          <input
            className="title_input outline-0 rounded-xl px-3"
            id="content"
            type="text"
            value={post.content ?? ""}
            onChange={handleContent}
            name="content"
            placeholder="Inserisci il titolo del post"
          />
          <label htmlFor="category" className="py-3 font-bold">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={category}
            className="rounded-xl p-2"
            onChange={handleCategory}
          >
            <option value="0">Select category</option>
            <option value="1">Front-end</option>
            <option value="2">Back-end</option>
            <option value="3">Full-stack</option>
            <option value="4">App Smartphone</option>
          </select>
          <section className="tags_section flex flex-wrap justify-around mt-2 ">
            <section className="tags_container flex items-center mt-1 me-3">
              <label htmlFor="html" className="py-3 font-bold TEXT-[20px]">
                HTML
              </label>
              <input
                id="html"
                type="checkbox"
                value={0}
                onChange={handleTags}
                className="appearance-none border border-gray-300 rounded-md checked:bg-sky-800  checked:border-transparent focus:outline-none focus:ring focus:border-blue-300 mx-2 w-5 h-5"
              />
            </section>
            <div className="tags_container flex items-center mt-1 me-3">
              <label htmlFor="css" className="py-3 font-bold TEXT-[20px]">
                CSS
              </label>
              <input
                id="css"
                type="checkbox"
                value={1}
                onChange={handleTags}
                className="appearance-none border border-gray-300 rounded-md checked:bg-sky-800  checked:border-transparent focus:outline-none focus:ring focus:border-blue-300 mx-2 w-5 h-5"
              />
            </div>
            <div className="tags_container flex items-center mt-1 me-3">
              <label
                htmlFor="javascript"
                className="py-3 font-bold TEXT-[20px]"
              >
                JAVASCRIPT
              </label>
              <input
                id="javascript"
                type="checkbox"
                value={2}
                onChange={handleTags}
                className="appearance-none border border-gray-300 rounded-md checked:bg-sky-800  checked:border-transparent focus:outline-none focus:ring focus:border-blue-300 mx-2 w-5 h-5"
              />
            </div>
            <div className="tags_container flex items-center mt-1 me-3">
              <label htmlFor="php" className="py-3 font-bold TEXT-[20px]">
                PHP
              </label>
              <input
                id="php"
                type="checkbox"
                value={3}
                onChange={handleTags}
                className="appearance-none border border-gray-300 rounded-md checked:bg-sky-800  checked:border-transparent focus:outline-none focus:ring focus:border-blue-300 mx-2 w-5 h-5"
              />
            </div>
            <div className="tags_container flex items-center mt-1 me-3">
              <label htmlFor="laravel" className="py-3 font-bold TEXT-[20px]">
                LARAVEL
              </label>
              <input
                id="laravel"
                type="checkbox"
                value={4}
                onChange={handleTags}
                className="appearance-none border border-gray-300 rounded-md checked:bg-sky-800  checked:border-transparent focus:outline-none focus:ring focus:border-blue-300 mx-2 w-5 h-5"
              />
            </div>
          </section>
          <button className="px-3 py-2 my-4 bg-sky-800 rounded-3xl text-white font-bold">
            {editMode === false ? "Add post" : "Edit post"}
          </button>
        </form>
        <div className="mt-4">
          <h2 className="text-2xl">Post List</h2>
          <ul>
            {potsList.map((post) => {
              return (
                <li
                  key={post.id}
                  className="border-b-2 my-2 py-3 flex justify-between"
                >
                  <div className="Info_container">
                    <div className="text-[20px] font-semibold">
                      {post.title}
                    </div>
                    <div className="">{post.image}</div>
                    <div className="text-[14px] ">{post.content}</div>
                  </div>
                  <div className="btn_section flex items-center">
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="px-3 mx-2 bg-sky-300 rounded-3xl text-white hover:scale-[1.1] duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="close hover:scale-[1.1] duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#a40909"
                        className="bi bi-x-square-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                      </svg>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
