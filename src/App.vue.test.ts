import { mount } from "@vue/test-utils";
import App from "./App.vue";
import { describe, expect, it } from "vitest";

const app = mount(App, {
  props: {}
})

describe("App.vue", () => {
  const appText = 'App is running 🚀'
  it("App text is correct", async () => {
    expect(app.text()).toContain(appText);
  });
})
