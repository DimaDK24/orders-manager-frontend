import reducer, { getMaximumProductId } from './products_reducer'
import { addProduct, removeProduct } from '../actions'
import createProduct from '../models/product_model'

const createMockProduct = (id) => createProduct({ id })

describe('products reducer', () => {
  it('handles addProduct action', () => {
    const actual = reducer({ items: [createMockProduct(1)] }, addProduct())
    const expected = {
      items: [createMockProduct(1), createMockProduct(2)],
    }
    expect(actual).toEqual(expected)
  })

  it('handles addProduct action with complex state', () => {
    const state = { items: [createMockProduct(1), createMockProduct(3)] }
    const actual = reducer(state, addProduct())
    const expected = {
      items: [createMockProduct(1), createMockProduct(3), createMockProduct(4)],
    }
    expect(actual).toEqual(expected)
  })

  it('handles removeProduct action', () => {
    const state = { items: [createMockProduct(1), createMockProduct(2)] }
    const actual = reducer(state, removeProduct(1))
    const expected = { items: [createMockProduct(2)] }
    expect(actual).toEqual(expected)
  })

  it('handles removeProduct action 2', () => {
    const state = {
      items: [createMockProduct(1), createMockProduct(2), createMockProduct(5)],
    }
    const actual = reducer(state, removeProduct(2))
    const expected = { items: [createMockProduct(1), createMockProduct(5)] }
    expect(actual).toEqual(expected)
  })
})

describe('getMaximumProductId', () => {
  it('returns maximum product id for 1 product', () => {
    expect(getMaximumProductId([createMockProduct(1)])).toBe(1)
  })

  it('returns maximum product id for 2 products', () => {
    const products = [createMockProduct(10), createMockProduct(20)]
    expect(getMaximumProductId(products)).toBe(20)
  })

  it('returns maximum product id for 5 products', () => {
    const products = [
      createMockProduct(2),
      createMockProduct(10),
      createMockProduct(13),
      createMockProduct(50),
      createMockProduct(100),
    ]
    expect(getMaximumProductId(products)).toBe(100)
  })
})
