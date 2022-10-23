const path = require('path')
const fs = require('fs')

module.exports = (root, ext) => {
    return root.reduce((files, current) => {
        const currentPath = path.join(process.cwd(), current)
    
        fs.readdirSync(currentPath).forEach(file => { 
            const parsePath = path.parse(file)
    
            if (files.hasOwnProperty(parsePath.ext)) {
                const entry = { ...files[parsePath.ext] }
    
                entry[parsePath.name] = path.join(currentPath, file)
    
                files[parsePath.ext] = entry
            }
        })
        
        return files
    }, ext)
}