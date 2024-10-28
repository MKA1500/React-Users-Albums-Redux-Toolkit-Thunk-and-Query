import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import AlbumsList from "../albumsList";
import { setupStore } from "../../store";

jest.mock("axios");

jest.mock("../../store", () => ({
  ...jest.requireActual("../../store"),
  useFetchAlbumsQuery: jest.fn(),
  useAddAlbumMutation: jest.fn(),
}));

const mockUser = { id: 1, name: "John Doe" };
const mockAlbums = [
  { id: 1, title: "First Album" },
  { id: 2, title: "Second Album" },
];

describe("AlbumsList Component", () => {
  let mockAddAlbum;

  beforeEach(() => {
    mockAddAlbum = jest.fn();
    require("../../store").useAddAlbumMutation.mockReturnValue([
      mockAddAlbum,
      {},
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    require("../../store").useFetchAlbumsQuery.mockReturnValue({
      isLoading: true,
    });

    render(
      <Provider store={setupStore()}>
        <AlbumsList user={mockUser} />
      </Provider>
    );

    expect(screen.getByClassName("loader")).toBeInTheDocument();
  });

  it("renders error state if there is an error fetching albums", () => {
    require("../../store").useFetchAlbumsQuery.mockReturnValue({ error: true });

    render(
      <Provider store={setupStore()}>
        <AlbumsList user={mockUser} />
      </Provider>
    );

    expect(screen.getByText(/Error loading albums.../i)).toBeInTheDocument();
  });

  it("renders albums correctly", () => {
    require("../../store").useFetchAlbumsQuery.mockReturnValue({
      data: mockAlbums,
      isLoading: false,
    });

    render(
      <Provider store={setupStore()}>
        <AlbumsList user={mockUser} />
      </Provider>
    );

    expect(screen.getByText(/Albums list for John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/First Album/i)).toBeInTheDocument();
    expect(screen.getByText(/Second Album/i)).toBeInTheDocument();
  });

  it("calls addAlbum when the Add Album button is clicked", () => {
    require("../../store").useFetchAlbumsQuery.mockReturnValue({
      data: mockAlbums,
      isLoading: false,
    });

    render(
      <Provider store={setupStore()}>
        <AlbumsList user={mockUser} />
      </Provider>
    );

    const addButton = screen.getByText(/\+ Add album/i);
    fireEvent.click(addButton);

    expect(mockAddAlbum).toHaveBeenCalledWith(mockUser);
  });
});
