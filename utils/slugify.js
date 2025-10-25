function generateSlug(name) {
  return name
    .toLowerCase()          // convert all letters to small
    .trim()                 // remove spaces from start & end
    .replace(/[^a-z0-9\s-]/g, '')  // remove symbols like @, #, !
    .replace(/\s+/g, '-')   // replace spaces with '-'
    .replace(/-+/g, '-');   // remove extra '-'
}

module.exports = generateSlug;
