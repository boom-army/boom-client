import { NFTGallery } from "../../../components/Profile/NFTGallery";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import {JssProvider } from 'react-jss';
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer(
  {
    classNameReplacer(className, index) {
      return `css-${index}`
    },
      // includeStyles: false 
  }
));

test("NFT Gallery ", async () => {
  let rendered;
  await act(async () => {
    
    rendered = render(
      <SnackbarProvider>
        <NFTGallery publicAddress="JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4" />
      </SnackbarProvider>
    );
  });
  expect(rendered).toMatchSnapshot();
});
