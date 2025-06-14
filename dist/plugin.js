exports.version = 3.0
exports.description = "Dracula theme by 8gudbits"
exports.isTheme = "dark"
exports.preview = "https://github.com/8gudbits/hfs-dracula-theme/raw/main/preview.png"
exports.apiRequired = 1
exports.repo = "8gudbits/hfs-dracula-theme"
exports.frontend_css = "style.css"
exports.frontend_js = 'main.js'
exports.config = {
    number_of_background_stars: {
        frontend: true,
        type: 'number',
        min: 15,
        max: 100,
        placeholder: 'default: 30'
    },
    smallest_star_size_in_px: {
        frontend: true,
        type: 'number',
        min: 1,
        max: 3,
        placeholder: 'default: 1'
    },
    largest_star_size_in_px: {
        frontend: true,
        type: 'number',
        min: 2,
        max: 5,
        placeholder: 'default: 2'
    }
}
