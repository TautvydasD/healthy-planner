import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import About from '../../src/views/About.vue'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     expect(wrapper.text()).to.include(msg)
//   })
// })

describe('About.vue', () => {
  it('renders h1 tag', () => {
    const wrapper = shallowMount(About)
    // console.log(wrapper.find('h1')[])
    expect(wrapper.find('h1').text() === 'Who is this for?')
  })
})

describe('About.vue', () => {
  it('renders p tag', () => {
    const wrapper = shallowMount(About)
    const val = 'The System is built to be all-in-one,\
    so a person would not have to have\
    multiple apps installed and check through them at the same time.'
    const arr = wrapper.findAll('p')
    console.log(arr[0].text())
    expect(arr[1].text() === `Goal of this planner is convenience. ${val}`)
  })
})