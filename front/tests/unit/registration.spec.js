import { shallowMount, mount } from '@vue/test-utils'
import RegistrationView from '@/pages/registration/registration.vue';


describe('RegistrationView.vue Test.', () => {

    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = shallowMount(RegistrationView, {
            data() {
                return{
                    /*email: '',
                    username: '',
                    password: '',
                    birthdate: '',
                    user_gender: '',
                    errors: '',*/
				username: '',
				surname:'',
				patronymic:'',
				birthdate: '',
				user_gender: '',
				email: '',
				password: '',
				repeat_password:'',
				errors: ''
					
                }
            }
        })

        expect(wrapper.exists()).toBe(true);

        expect(wrapper.vm.email).toBe('')
        expect(wrapper.vm.username).toBe('')
		expect(wrapper.vm.surname).toBe('')
		expect(wrapper.vm.patronymic).toBe('')
        expect(wrapper.vm.password).toBe('')
        expect(wrapper.vm.birthdate).toBe('')
        expect(wrapper.vm.user_gender).toBe('')
        expect(wrapper.vm.errors).toBe('')
		expect(wrapper.vm.repeat_password).toBe('')
    })

    it('initializes with error message', () => {
        // render the component
        wrapper = shallowMount(RegistrationView, {
            data() {
                return{
					
				username: 'Username',
				surname:'Surname',
				patronymic:'Patronimic', 
				birthdate: 'xxxxx',
				user_gender: 'Male',
                email: 'userexample@mail.com',
                password: 'password',
				repeat_password: 'password',				
                errors: 'error1',
                }
            }
        })

        expect(wrapper.exists()).toBe(true);
		expect(wrapper.vm.username).toBe('Username')
		expect(wrapper.vm.surname).toBe('Surname')
		expect(wrapper.vm.patronymic).toBe('Patronimic')
		expect(wrapper.vm.birthdate).toBe('xxxxx')
		expect(wrapper.vm.password).toBe('password')
		expect(wrapper.vm.email).toBe('userexample@mail.com')
		expect(wrapper.vm.user_gender).toBe('Male')
		expect(wrapper.vm.repeat_password).toBe('password')
		expect(wrapper.vm.errors).toBe('error1')

        // check that each element
        
    })


    it('initializes with success message', () => {
    // render the component
    wrapper = shallowMount(RegistrationView, {
        data() {
            return{
            email: 'user@mail.com',
            username: 'user',
			surname:'surname',
			patronymic:'patronimic',
            password: 'notuserpassword33',
            birthdate: '2005-02-04',
            user_gender: 'M',
			repeat_password: 'notuserpassword33',
            errors: '',
            }
        }
    })

    expect(wrapper.exists()).toBe(true);

    // check that each element
    expect(wrapper.vm.email).toBe('user@mail.com')
    expect(wrapper.vm.username).toBe('user')
    expect(wrapper.vm.password).toBe('notuserpassword33')
    expect(wrapper.vm.birthdate).toBe('2005-02-04')
    expect(wrapper.vm.user_gender).toBe('M')
    expect(wrapper.vm.errors).toBe('')
	expect(wrapper.vm.surname).toBe('surname')
	expect(wrapper.vm.patronymic).toBe('patronimic')
	expect(wrapper.vm.repeat_password).toBe('notuserpassword33')
    })


    test('Registration input test.', async() => {
        const wrapper = mount(RegistrationView)

        expect(wrapper.exists()).toBe(true)
		
		const username =  wrapper.find('input#user_name_input')
        await username.setValue("username")
        expect(username.element.value).toBe("username")
		
		const surname =  wrapper.find('input')
        await surname.setValue("surname")
        expect(surname.element.value).toBe("surname")
		
		const patronymic =  wrapper.find('input')
        await patronymic.setValue("patronymic")
        expect(patronymic.element.value).toBe("patronymic")
		
		const birthdate = wrapper.find('input')
        await birthdate.setValue("2010-07-22")
        expect(birthdate.element.value).toBe("2010-07-22")
		
		const user_gender = wrapper.find('input')
        await user_gender.setValue("Male")
        expect(user_gender.element.value).toBe("Male")
        
		const email = wrapper.find('input')
        await email.setValue('test@mail.com')
        expect(email.element.value).toBe('test@mail.com')



        const password = wrapper.find('input')
        await password.setValue("password")
        expect(password.element.value).toBe("password")
		
		const repeat_password = wrapper.find('input')
        await repeat_password.setValue("password")
        expect(repeat_password.element.value).toBe("password")   

		
    })
    


    
})

test('input test.', async() => {
    const wrapper = mount(RegistrationView)

    expect(wrapper.exists()).toBe(true)

    
    const gender_input = wrapper.find('#gender_input')
    const email = wrapper.find('#email_input')
    const username = wrapper.find('#user_name_input');
    const password = wrapper.find('#password_input');
    const repeat_password = wrapper.find('#repeat_password');
    const birthdate = wrapper.find('#birthdate_input');
	const surname_input = wrapper.find('#surname_input');
	const patronymic_input = wrapper.find('#patronymic_input');
	
	await surname_input.setValue("Usersurname")
	await patronymic_input.setValue("Userpatronymic")
    await gender_input.setValue("Male")
    await email.setValue("test@mail.com")
    await username.setValue("username")
    await password.setValue("password")
    await birthdate.setValue("2018-07-22")
	await repeat_password.setValue("password")
	
	expect(patronymic_input.element.value).toBe("Userpatronymic")
	expect(surname_input.element.value).toBe("Usersurname")
    expect(repeat_password.element.value).toBe("password")
    expect(gender_input.element.value).toBe("Male")
    expect(email.element.value).toBe("test@mail.com")
    expect(username.element.value).toBe("username")
    expect(password.element.value).toBe("password")
    expect(birthdate.element.value).toBe("2018-07-22")
})