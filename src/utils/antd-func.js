export const selectFilterOption = (input, option) => {
    const { children, label } = option;
    if (children) {
        return children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    } else if (label) {
        return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
};
