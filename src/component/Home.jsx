import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Home.css";
import { MdDelete } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";

// .........................get data from localStorage................................

const getlocaldata = () => {
  let NotesList = localStorage.getItem("notes");
  //   console.log(NotesList);
  if (NotesList) {
    return JSON.parse(NotesList);
  } else {
    return [];
  }
};

const Home = () => {
  const [addNOtes, setAddNotes] = useState("");
  const [submitNotes, setSubmitsNotes] = useState(getlocaldata());
  const [edit, setEdit] = useState(null);
  const [togglebtn, setTogglebtn] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const addedNotes = () => {
    if (!addNOtes) {
    } else if (addNOtes && !togglebtn) {
      setSubmitsNotes(
        submitNotes.map((elem) => {
          if (elem.id === edit) {
            return { ...elem, notes: addNOtes };
          }
          return elem;
        })
      );
      setTogglebtn(false);
      setAddNotes("");
      setEdit(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        notes: addNOtes,
      };
      setSubmitsNotes([...submitNotes, allInputData]);
      setAddNotes("");
    }
  };

  //   .............................delete notes......................................

  const DeleteNotes = (index) => {
    alert("delete");
    //console.log(index)
    let showAfterDelete = submitNotes.filter((ele) => {
      return index != ele.id;
    });

    setSubmitsNotes(showAfterDelete);
  };

  // ........................Edit and UpdateData.....................................

  const EditNotes = (id) => {
    alert("please update notes");

    let AllUpdateNotes = submitNotes.find((ele) => {
      return ele.id === id;
    });

    console.log(AllUpdateNotes);
    setTogglebtn(false);
    setAddNotes(AllUpdateNotes.notes);
    setEdit(id);
  };

  //  .....................set data in localStorage................................

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(submitNotes));
  }, [submitNotes]);

  return (
    <>
      <div className="home">
        <input
          className="addinput"
          type="text"
          placeholder="add notes ......"
          value={addNOtes}
          onChange={(e) => setAddNotes(e.target.value)}
        />
        {togglebtn ? (
          <button className="btn" onClick={addedNotes}>
            {" "}
            Add Notes{" "}
          </button>
        ) : (
          <button className="btn" onClick={addedNotes}>
            {" "}
            Add Notes{" "}
          </button>
        )}
      </div>
      <div className="search">
        <input
          className="searchinput"
          type="text"
          placeholder="search here..........."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        {/* ...................display  notes............................ */}
        <div className="notes">
          {submitNotes.map((ele, index) => (
            <div key={ele.id}>
              <div className="displaynotes">
                <div className="ele">{ele.notes}</div>

                <div className="btnn">
                  <MdDelete
                    onClick={() => DeleteNotes(ele.id)}
                    className="deletbtn"
                  />

                  <RiEditBoxFill
                    onClick={() => EditNotes(ele.id)}
                    className="editbtn"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
