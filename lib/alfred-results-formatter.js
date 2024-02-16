export default function (results) {
    let formatted;

    if (results === null) {
        formatted = {
            items: [{
                uid: 'enter-search-term',
                title: 'Enter search term',
                subtitle: 'A repository or organization you have access to',
                valid: false
            }],
        };
    } else {
        formatted = {
            items: results.map(({ item }) => ({
                uid: item,
                title: item,
                arg: 'https://github.com/' + item,
            })),
        };
    }

    return formatted;
}