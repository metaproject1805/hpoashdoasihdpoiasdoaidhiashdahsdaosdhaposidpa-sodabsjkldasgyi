import {useDispatch, useSelector, useStore} from "react-redux"
import type { RootStore, AppDispatch, AppStore } from "./store"



export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const usAppSelector = useSelector.withTypes<RootStore>()
export const useAppStore = useStore.withTypes<AppStore>()