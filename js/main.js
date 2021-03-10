
var valIn, outKey;
var templ = `
    <div class="mobile-show"><a href="javascript:;"><i class="fa fa-search" aria-hidden="true"></i></a></div>
    <div class="box-search">
        <form action="">
            <input type="text" oninput="run()" id="input-search" placeholder="Search">
            <button><i class="fa fa-search" aria-hidden="true"></i></button>
        </form>
        <div class="box-drop">
            <div class="box-item">
                <h4>suggestion</h4>
                <ul id="suggestion-box">
                    
                </ul>
            </div>
            <div class="box-item">
                <h4>collection</h4>
                <ul id="collection-box">

                </ul>
            </div>
            <div class="box-item">
                <h4>product</h4>
                <div id="product-box">

                </div>
            </div>
            <a href="#" class="show-more">Show more product</a>
        </div>
    </div>
    <div class="mobile-hide"><a href="javascript:;"><i class="fa fa-times" aria-hidden="true"></i></a></div>
`;
$(document).ready(function(){
    $("#search-autocomplete").html(templ);

    function showSearchMobile(){
        $('.mobile-show').click(function(){
            $('.search').addClass('active');
        });
        $('.mobile-hide').click(function(){
            $('.search').removeClass('active');
        })
    }
    showSearchMobile()
})
function Searchbox(option) {
    this.option = option;
}

Searchbox.prototype.getdata = function (type) {
    fetch('http://www.json-generator.com/api/json/get/bUmYSHJdLm')
        .then(response => response.json())
        .then(function (data) {
            if (type == 'Suggestion') {
                runSearch.suggestion(data[0].Suggestion);
            }
            if (type == 'Collection') {
                runSearch.collection(data[0].Collection);
            }
            if (type == 'Product') {
                runSearch.product(data[0].Product);
            }
        });
}

Searchbox.prototype.checkKey = function () {
    valIn = $('#input-search').val().trim();
    if (valIn.indexOf("to") > -1) {
        outKey = valIn.replace(/to/g, 'B')
        if (valIn.indexOf("t") > -1) {
            outKey = outKey.replace(/t/g, 'A')
        }
    } else if (valIn.indexOf("t") > -1 && valIn.indexOf("t0") == -1) {
        outKey = valIn.replace(/t/g, 'A')
    } else {
        outKey = valIn
    }
    return outKey;
}

Searchbox.prototype.suggestion = function (data) {
    if (this.option.suggestion.status == false) return
    let html = '', numKey = this.option.suggestion.numKey;
    let coutItem = 0
    runSearch.checkKey();
    if (outKey != '') {
        if (outKey.length >= numKey) {
            $.each(data, function (index, value) {
                if (value.Term.toLowerCase().includes(outKey.toLowerCase())) {
                    html += `<li>${value.Term}</li>`;
                    coutItem++;
                }
            });
            $('#suggestion-box').html(html);
            if (coutItem > 3) {
                $('.search .box-drop .show-more').show()
            } else {
                $('.search .box-drop .show-more').hide()
            }
        }
    } else {
        $('#suggestion-box').html('');
    }
}
Searchbox.prototype.collection = function (data) {
    if (this.option.collection.status == false) return
    let html = '', numKey = this.option.collection.numKey;

    runSearch.checkKey();
    if (outKey != '') {
        if (outKey.length >= numKey) {
            $.each(data, function (index, value) {
                if (value.Title.toLowerCase().includes(outKey.toLowerCase())) {
                    html += `<li>${value.Title}</li>`;
                }
            });
            $('#collection-box').html(html);
        }
    } else {
        $('#collection-box').html('');
    }
}
Searchbox.prototype.product = function (data) {
    if (this.option.product.status == false) return
    let html = '', numKey = this.option.product.numKey;

    runSearch.checkKey();

    if (outKey != '') {
        if (outKey.length >= numKey) {
            $.each(data, function (index, value) {
                if (value.Title.toLowerCase().includes(outKey.toLowerCase())) {
                    html += `
                        <div class="item">
                            <a href="#" class="image">
                                <img src="${value.Image}" alt="">
                            </a>
                            <div class="info">
                                <a href="#" class="title">${value.Title}</a>
                                <span class="brand">${value.Brand}</span>
                                <b class="price">${value.Price}</b>
                            </div>
                        </div>`;
                }
            });
            $('#product-box').html(html);
        }
    } else {
        $('#product-box').html('');
    }
}

function dropShow() {
    var fc_input = $(".search input").val();
    if (fc_input != '') {
        $('.search .box-drop').show();
        $(".search input").focus(function () {
            $('.search .box-drop').show();
        });

        $(".search input").blur(function () {
            $('.search .box-drop').hide();
        });
    } else {
        $('.search .box-drop').hide();
    }
}
function run() {
    runSearch.getdata('Suggestion');
    runSearch.getdata('Product');
    runSearch.getdata('Collection');
    dropShow();
}
var runSearch = new Searchbox(
    {
        suggestion: {
            status: true,
            numKey: 1,
        },
        collection: {
            status: true,
            numKey: 1,
        },
        product: {
            status: true,
            numKey: 1,
        }
    }
);
