'use client';

import { Provider } from 'react-redux';
import { store } from "@/redux/store";
import {Content} from "@/templates";

export default function Home () {
  return <Provider store={store}>
    <Content/>
  </Provider>;
};

