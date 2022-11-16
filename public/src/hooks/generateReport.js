export default function (arr) {
    let success = 0;
    let errors = 0;
    let locate;

    arr.map((x, idx) => {
        if (x.success) {
            success++;
        } else {
            errors++;
            locate.push(idx);
        }
    });
    return `${success} employees have been succesfully uploaded, ${errors} Errors`;
}
