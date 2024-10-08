const delButton = $(".delete-btn");
delButton.on("click", function(){
    const index = this.getAttribute("data-index");
    const toBeDeleted = $(`[data-index='${index}']`);
    toBeDeleted.remove();
    $.ajax({
        url: '/delete',
        type: 'DELETE',
        contentType: 'application/json', 
        data: JSON.stringify({index: index}),
        success: function(result) {
            console.log('Resource deleted successfully', result);
        },
        error: function(xhr, status, error) {
            console.error('Error deleting resource:', error);
        }
    });
});