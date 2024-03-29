import React, { useState, useEffect } from "react";

const Toast = (props) => {
  const { toastList, position, autoDelete, autoDeleteTime } = props;
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, autoDeleteTime, list]);

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  };

  return (
    <>
      <div className={`notification-container ${position}`}>
        {list.map((toast, i) => (
          <div
            key={i}
            className={`notification toast ${position}`}
            style={{ backgroundColor: toast.backgroundColor }}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
const BUTTON_PROPS = [
  {
    id: 1,
    type: "success",
    className: "success",
    label: "Success"
  },
  {
    id: 2,
    type: "danger",
    className: "danger",
    label: "Danger"
  },
  {
    id: 3,
    type: "info",
    className: "info",
    label: "Info"
  },
  {
    id: 4,
    type: "warning",
    className: "warning",
    label: "Warning"
  }
];

const ToastLayout = () => {
  const [list, setList] = useState([]);
  const [position, setPosition] = useState("Select Position");
  let [checkValue, setCheckValue] = useState(false);
  const [autoDeleteTime, setAutoDeleteTime] = useState(0);
  let toastProperties = null;

  const selectPosition = (e) => {
    setPosition(e.target.value);
    setList([]);
  };

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "success":
        toastProperties = {
          id,
          title: "Success",
          description: "This is a success toast component",
          backgroundColor: "#5cb85c"
        };
        break;
      case "danger":
        toastProperties = {
          id,
          title: "Danger",
          description: "This is a error toast component",
          backgroundColor: "#d9534f"
        };
        break;
      case "info":
        toastProperties = {
          id,
          title: "Info",
          description: "This is an info toast component",
          backgroundColor: "#5bc0de"
        };
        break;
      case "warning":
        toastProperties = {
          id,
          title: "Warning",
          description: "This is a warning toast component",
          backgroundColor: "#f0ad4e"
        };
        break;

      default:
        setList([]);
    }
    setList([...list, toastProperties]);
  };

  const onCheckBoxChange = () => {
    checkValue = !checkValue;
    setCheckValue(checkValue);
    setList([]);
  };

  const onInputChange = (e) => {
    const time = parseInt(e.target.value, 10);
    setAutoDeleteTime(time);
  };

  return (
    <div className="form-container">
      <fieldset className="form-fieldset">
        <section className="col-des-1-1 aiCenter jcBetween">
          <div className="toast-buttons">
            {BUTTON_PROPS.map((e) => (
              <>
                <Button
                  key={e.id}
                  className={`form-button ${
                    position === "Select Position"
                      ? `${e.className} btn-disable`
                      : `${e.className}`
                  }`}
                  onClick={() => showToast(e.type)}
                >
                  {e.label}
                </Button>
              </>
            ))}
          </div>
        </section>
      </fieldset>
      <fieldset className="form-fieldset">
        <section className="">
          <label htmlFor="auto" className="checkbox-label">
            <input
              id="auto"
              type="checkbox"
              name="checkbox"
              value={checkValue}
              onChange={onCheckBoxChange}
            />
            Auto Dismiss
            <i></i>
          </label>
        </section>
        <section className="">
          <div className="select">
            <label htmlFor="checkbox" className="input-label">
              <input
                disabled={`${!checkValue ? true : ""}`}
                className={`${!checkValue ? "disabled" : ""}`}
                type="text"
                name="checkbox"
                placeholder="Dismiss time Ex: 3000"
                autoComplete="false"
                onChange={onInputChange}
              />
            </label>
          </div>
        </section>
        <section className="select select-label">
          <select
            name="position"
            value={position}
            onChange={selectPosition}
            className="position-select"
          >
            <option>Select Position</option>
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
          <i></i>
        </section>
      </fieldset>

      <Toast
        toastList={list}
        position={position}
        autoDelete={checkValue}
        autoDeleteTime={autoDeleteTime}
      />
    </div>
  );
};

const Button = ({
  htmlId,
  name,
  type,
  size,
  classname,
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      className={`button form-button ${classname}`}
      id={htmlId}
      name={name}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ToastLayout;