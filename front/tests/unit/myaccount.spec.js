import {mount, shallowMount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import { createStore } from 'vuex';
import ProfileView from '@/pages/myaccount/myaccount.vue';
import {getAPI} from '@/api'

jest.mock('@/api', () => ({
    getAPI: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve())
}))



Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost/myaccount.vue'
  },
  writable: true
});

const userData = {
  username: 'Name',
  surname: 'Surname',
  patronymic: 'Patronymic',
  
  birth_date: '2000-01-01',
  user_gender: 'Male',
  email: 'test@example.com'
}

jest.mock('@/api', () => ({
  getAPI: jest.fn().mockResolvedValue({
    data: userData
  })
}));

describe('ProfileView.vue', () => {
    let wrapper
    let store
    let actions



    beforeEach(() => {
        actions = {
            getUserInfo: jest.fn(),
            getUrls: jest.fn()
        }

        store = new Vuex.Store({
            actions,
            state: {
                accessToken: 'your_access_token',
                user_id: 'your_user_id'
            },
            getters: {
                authorized: () => true
            }
        })

        wrapper = mount(ProfileView, {
            global: {
                plugins: [store]
            },

            mocks: {
                $store: {
                    state: {
                        accessToken: 'your_access_token'
                    },
                    getters: {
                        authorized: true
                    }
                }
            }
        })
    })

    it('renders user information correctly', async () => {
       
        await wrapper.vm.getUserInfo()
        await wrapper.vm.$nextTick()

    const rows = wrapper.findAll('tbody tr');
    expect(rows[0].findAll('td')[1].text()).toContain(userData.username);
	expect(rows[1].findAll('td')[1].text()).toContain(userData.surname);
	expect(rows[2].findAll('td')[1].text()).toContain(userData.patronymic);
	expect(rows[3].findAll('td')[1].text()).toContain(userData.birth_date);
	expect(rows[4].findAll('td')[1].text()).toContain(userData.user_gender);
    expect(rows[5].findAll('td')[1].text()).toContain(userData.email);
    
    
    })
})