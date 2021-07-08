import { cities, countries } from './migrations'
import { prisma } from '../lib/prisma'

async function main() {
  await Promise.all(countries.map(country => {
    return prisma.country.create({
      data: {
        name: country.name,
        cities: {
          createMany: {
            data: cities.map(city => ({
              name: city.name
            }))
          }
        }
      }
    })
  }))

  console.log(`
    - ${countries.length} Countries created.
    - ${cities.length} Cities created.
  `)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })