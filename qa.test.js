const { clickElement, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Qamid tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("The first link text 'Идем в кино'", async () => {
    const actual = await getText(page, "header h1");
    expect(actual).toContain("Идёмвкино");
  });

  test("Booking ticket", async () => {
    await clickElement(page, ".page-nav a + a + a");
    await clickElement(page, ".movie-seances__list li + li + li a");
    await clickElement(
      page,
      ".buying-scheme__wrapper .buying-scheme__row span + span + span + span"
    );
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".acceptin-button");
    await expect(actual).toContain("Получить код бронирования");
  });

  test("Not booked, if the seat is not selected", async () => {
    await clickElement(page, ".page-nav a + a + a");
    await clickElement(page, ".movie-seances__list li + li + li a");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".buying-scheme__legend div p + p");
    await expect(actual).toContain(" Свободно VIP (");
  });
});
