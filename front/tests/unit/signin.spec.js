import { shallowMount, mount } from '@vue/test-utils'
import SigninView from '@/pages/signin/signin.vue'

describe('SigninView.vue Test', () => {
    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = shallowMount(SigninView, {
            data() {
                return{
                email: '',
                password: '',
                error_text: ''
                }
            }
        })

        expect(wrapper.exists()).toBe(true);

        expect(wrapper.vm.email).toBe('')
        expect(wrapper.vm.password).toBe('')
        expect(wrapper.vm.error_text).toBe('')
    })

    it('initializes with error message', () => {
        // render the component
        wrapper = shallowMount(SigninView, {
            data() {
                return{
                email: 'user@mail.com',
                password: 'notuserpassword',
                error_text: 'wrong password'
                }
            }
        })

        expect(wrapper.exists()).toBe(true);
    
        
        expect(wrapper.vm.email).toMatch('user@mail.com')
        expect(wrapper.vm.password).toMatch('notuserpassword')
        expect(wrapper.vm.error_text).toMatch('wrong password')
    })


    it('initializes with success message', () => {
    
        wrapper = shallowMount(SigninView, {
            data() {
                return{
                email: 'user1337@uy.com',
                password: 'password',
                error_text: ''
                }
            }
        })

        expect(wrapper.exists()).toBe(true);
    
        
        expect(wrapper.vm.email).toMatch('user1337@uy.com')
        expect(wrapper.vm.password).toMatch('password')
        expect(wrapper.vm.error_text).toMatch('')
    })


    it('emits an event when the button is clicked y', () => {
        
        wrapper = shallowMount(SigninView, {
            data() {
                return{
                email: 'user1337@uy.com',
                password: 'password',
                error_text: ''
                }
            }
        })

        expect(wrapper.exists()).toBe(true);
    
       
    })


    

})

test('input test.', async() => {
    const wrapper = mount(SigninView)

    expect(wrapper.exists()).toBe(true)

    const email = wrapper.find('#email_input')
    const password = wrapper.find('#password_input');


    await email.setValue("test@mail.com")
    await password.setValue("password")

    expect(email.element.value).toBe("test@mail.com")
    expect(password.element.value).toBe("password")
})