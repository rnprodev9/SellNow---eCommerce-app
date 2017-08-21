export default obj => func => obj ? Object.keys(obj).map(key => func(obj[key], key)) : console.log('UNDEFIEND')
