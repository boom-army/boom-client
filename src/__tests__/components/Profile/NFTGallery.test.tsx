import { NFTGallery } from "../../../components/Profile/NFTGallery";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

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
