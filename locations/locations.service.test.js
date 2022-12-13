const locationsService = require('./locations.service')
const Location = require('./Locations.model')
jest.mock('./locations.model')


describe ('Locations FindAlL', ()=> {
    it('Should call model find', async () => {
        Location.find.mockResolvedValue([1, 2, 3, 4])
        expect(await locationsService.findAll()).toEqual([1, 2, 3, 4])
        expect(Location.find).toHaveBeenCalledTimes(1)
    })
})


describe ('Locations Findone', () => {
    it ('Should get a Location', async () => {
        const mockLocation = {
            _id: '639835cd66d2e8465807e711', filmName: 'Jiji la crevette',
        }
        Location.findOne.mockResolvedValue(mockLocation)
        expect (await locationsService.find('639835cd66d2e8465807e711')).toEqual(mockLocation)
        expect(Location.findOne).toHaveBeenCalledTimes(1)
    })


    it ('Should get a Location', async () => {
        const mockLocation = {
            _id: '639835cd66d2e8465807e711', filmName: 'Jiji la crevette',
        }
        Location.findOne.mockResolvedValue(mockLocation)
        expect (await locationsService.find('639835cd66d2e8465807e711')).toEqual(mockLocation)
        expect(Location.findOne).toHaveBeenCalledTimes(1)
    })

})

describe ('Locations Create', () => {
    it('Should call model create', async () => {
        const mockLocation = {
            _id: '639835cd66d2e8465807e711', filmName: 'Jiji la crevette',
        }
        Location.insertMany.mockResolvedValue(mockLocation)
        expect(await locationsService.create({
            _id: '639835cd66d2e8465807e711', filmName: 'Jiji la crevette',
        }))


        expect(Location.insertMany).toHaveBeenCalledWith({
            _id: '639835cd66d2e8465807e711', filmName: 'Jiji la crevette',
        })
    })

})

