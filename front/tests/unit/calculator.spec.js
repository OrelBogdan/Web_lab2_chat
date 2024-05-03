import {mount, shallowMount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import { createStore } from 'vuex';
import CalculatorView from '@/pages/calculator/calculator.vue';
import {getAPI} from '@/api'

jest.mock('@/api', () => ({
    getAPI: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve())
}))



test('input test', async() => {
    const wrapper = mount(CalculatorView);
    expect(wrapper.exists()).toBe(true);

    const calculator_input = wrapper.find('#calculator_input');
    const vm = wrapper.vm;
    
    await calculator_input.setValue("800");
    expect(calculator_input.element.value).toBe("800");
})

