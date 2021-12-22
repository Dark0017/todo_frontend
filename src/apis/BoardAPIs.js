import instance from "./AxiosInstance";
import { useDispatch } from "react-redux";

export const create = async (payload) => {
  try {
    await instance.post("/board/create", payload);
  } catch {
    (e) => console.log(e);
  }
};

export const getAll = async () => {
  const dispatch = useDispatch();
  dispatch(fetchBoards())
};
