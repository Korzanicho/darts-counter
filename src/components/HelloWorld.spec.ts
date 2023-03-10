/**
 * @vitest-environment happy-dom
 */
import { mount } from "@vue/test-utils";
import HelloWorld from "./HelloWorld.vue";
import { describe, expect, test } from "vitest";

describe("HelloWorld.vue", () => {
  test('should display header text', () => {
    const msg = 'Hello Vue 3'
    const wrapper = mount(HelloWorld, { props: { msg } })

    expect(wrapper.find('h1').text()).toEqual(msg)
  })
});