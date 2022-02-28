import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'


describe('Async test', () => {

  it('Render correctly', async () => {

    render(<Async />)

    expect(screen.queryByText('How to testing things async...')).toBeInTheDocument()
  })

  it('Render button invisible to visible', async () => {

    const { debug } = render(<Async />)
    debug()
    await waitFor(() => {
      return expect(screen.getByText('3s to show...')).toBeInTheDocument()
    }, { timeout: 2000 })
    debug()
  })

  it('Render button visible to invisible', async () => {

    const { debug } = render(<Async />)

    waitForElementToBeRemoved(screen.queryByText('button'))
    debug()
  })

})