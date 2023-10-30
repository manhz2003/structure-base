// import library
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GrClose } from "react-icons/gr";

// import component
import Button from "@/components/Common/Button";

// import common
import { appStore } from "@/store/app";
import { setIsModalSuccess } from "@/actions";

// import hook
import useOnClickOutside from "@/hooks/useOnClickOutside";

// import styles
import styles from "@/assets/styles/modal.module.scss";

function Modals({
  content,
  persistent = true,
  close = true,
  icon = false,
  action = false,
  icon_type = false,
  title = false,
  onAgree = false,
}) {
  let [isOpen, setIsOpen] = useState(false);
  const [isJump, setIsJump] = useState(false);
  const modalRef = useRef(null);
  const [appState, appDispatch] = useContext(appStore);

  useEffect(() => {
    if (content) {
      setIsOpen(true);
    }
  }, [content]);

  useEffect(() => {
    if (appState.isModalSuccess) {
      setIsOpen(false);
      appDispatch(setIsModalSuccess(false));
    }
  }, [appState]);

  useOnClickOutside(modalRef, () => {
    setIsJump(true);
    setTimeout(() => setIsJump(false), 500);
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  function closeModal() {
    if (persistent) return;
    setIsOpen(false);
  }

  const handleAgree = () => {
    if (onAgree) {
      onAgree();
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  ref={modalRef}
                  className={`${styles.wrapper_modal} ${
                    isJump && styles.active
                  } duration-150 ease-out hover:ease-in w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <span
                    onClick={() => handleClose()}
                    className={styles.icon_close}
                  >
                    <GrClose />
                  </span>
                  <div className={icon ? "flex" : ""}>
                    {icon && (
                      <div
                        className={`${styles.icon_notify} ${styles[icon_type]}`}
                      >
                        {icon}
                      </div>
                    )}
                    <div className={icon ? "ms-4" : ""}>
                      <h2 className="font-bold mb-3 text-xl">{title}</h2>
                      {content}
                    </div>
                  </div>
                  {action && (
                    <div className="flex justify-end mt-4">
                      <span onClick={() => handleClose()}>
                        <Button type="red">Cancel</Button>
                      </span>
                      <span onClick={() => handleAgree()}>
                        <Button>Agree</Button>
                      </span>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modals;
