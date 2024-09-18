import Database, { mockDatabase, Repository } from '../../../index';

describe('dateOnly operator', () => {
  let db: Database;

  let repository: Repository;

  afterEach(async () => {
    await db.close();
  });

  beforeEach(async () => {
    db = mockDatabase({
      timezone: '+08:00',
    });

    await db.clean({ drop: true });
    const Test = db.collection({
      name: 'tests',
      fields: [
        {
          name: 'date1',
          type: 'dateOnly',
        },
        {
          type: 'string',
          name: 'name',
        },
      ],
    });
    repository = Test.repository;
    await db.sync();
  });

  test('$dateOn', async () => {
    await repository.create({
      values: [
        {
          date1: '2023-01-01',
          name: 'u0',
        },
        {
          date1: '2023-01-01',
          name: 'u1',
        },
        {
          date1: '2022-12-31',
          name: 'u2',
        },
        {
          date1: '2022-12-31',
          name: 'u3',
        },
      ],
    });

    let count: number;

    count = await repository.count({
      filter: {
        'date1.$dateOn': '2022-12-31',
      },
    });

    expect(count).toBe(2);

    count = await repository.count({
      filter: {
        'date1.$dateOn': '2023-01-01',
      },
    });

    expect(count).toBe(2);
  });

  test('$dateBefore', async () => {
    await repository.create({
      values: [
        {
          date1: '2023-01-01',
          name: 'u0',
        },
        {
          date1: '2023-01-01',
          name: 'u1',
        },
        {
          date1: '2022-12-31',
          name: 'u2',
        },
        {
          date1: '2022-12-31',
          name: 'u3',
        },
      ],
    });

    let count: number;

    count = await repository.count({
      filter: {
        'date1.$dateBefore': '2023-01-01',
      },
    });
    expect(count).toBe(2);

    count = await repository.count({
      filter: {
        'date1.$dateBefore': '2022-12-31',
      },
    });

    expect(count).toBe(0);
  });

  test('dateBetween', async () => {
    await repository.create({
      values: [
        {
          date1: '2023-01-01',
          name: 'u0',
        },
        {
          date1: '2023-01-01',
          name: 'u1',
        },
        {
          date1: '2022-12-31',
          name: 'u2',
        },
        {
          date1: '2022-12-31',
          name: 'u3',
        },
      ],
    });

    let count: number;

    count = await repository.count({
      filter: {
        'date1.$dateBetween': ['2022-12-31', '2023-01-01'],
      },
    });

    expect(count).toBe(4);

    count = await repository.count({
      filter: {
        'date1.$dateBetween': ['2022-12-31', '2023-01-01'],
      },
    });

    expect(count).toBe(4);

    count = await repository.count({
      filter: {
        'date1.$dateBetween': ['2022-12-31', '2022-12-31'],
      },
    });

    expect(count).toBe(2);
  });
});