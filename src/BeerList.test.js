import {render, screen, waitFor, unmountComponentAtNode } from '@testing-library/react';
import BeerList from "./BeerList";
import * as api from "./api";

jest.mock("./api");

describe("BeerList Component", () => {
    beforeEach(() => jest.clearAllMocks());

    it("should list the temporature of each beer", async () => {
        api.getTemperatureFromApi.mockResolvedValue({
            results : [{id: 2, temperature: -2}]
        })
        render(<BeerList />);
        await waitFor(() => {
            screen.getByText("IPA");
        });
    });

    it("should show an error message when API fails", async () => {
        api.getTemperatureFromApi.mockRejectedValue({});
        render(<BeerList />);
        await waitFor(() => {
            screen.getByText("Unable to read temperature from API");
        });
    });
});