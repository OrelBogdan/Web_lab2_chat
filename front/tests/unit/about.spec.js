import { mount } from '@vue/test-utils'
import AboutView from '@/pages/about/about.vue';

describe('About.vue Test', () => {
    let wrapper = null

    // initializes with correct elements
    it('check exist', () => {
        wrapper = mount(AboutView, {
            
        })
        expect(wrapper.exists()).toBe(true);
    })
    
})