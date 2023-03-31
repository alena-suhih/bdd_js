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
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("The first link text 'Идем в кино'", async () => {
    const actual = await getText(page, "header h1");
    expect(actual).toContain("Идёмвкино");
  });

  test("Booking ticket", async () => {
    await clickElement(page, ".page-nav > a:nth-child(3)");
    await clickElement(page, '[data-seance-id="142"]');
    await clickElement(
      page,
      ".buying-scheme__wrapper > .buying-scheme__row > span:nth-child(4)"
    );
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".acceptin-button");
    await expect(actual).toContain("Получить код бронирования");
  });

  test("Not booked, if the seat is not selected", async () => {
    await clickElement(page, ".page-nav > a:nth-child(4)");
    await clickElement(page, '[data-seance-id="142"]');
    await clickElement(page, ".acceptin-button");
    const actual = page.url();
    await expect(actual).toEqual("http://qamid.tmweb.ru/client/hall.php");
  });
});
