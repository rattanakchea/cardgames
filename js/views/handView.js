var HandView = function(Hand, id){
    this.collection = Hand;
    this.el = id;


    //listen for changes

    this.render = function() {
        var html = '';
        _.forEach(Hand.cards, function(card){
            html += new CardView(card).render();
        });

        $(this.el).html(html);
    };

    this.renderOneCard = function(){
        if (this.collection.cards.length > 1){

            var cardView = new CardView(this.collection.cards[0]);
            var html = cardView.render();
            $(this.el).html(html);
        } else {
            console.log('nothing to render');
        }
    };

    //can add a card or an array
    this.add = function(card){
        if (_.isArray(card)) {
            //concat return a new array
            this.collection.cards = this.collection.cards.concat(card);
        } else {
            this.collection.cards.push(card);
        }
    };


    this.getScore = function(){
        var score = 0;
        var ace = 0;
        _.forEach(Hand.cards, function(card){

            var value = card.value;
            if (value > 9) {
                value = 10;
            } if (value == 1){
                value = 11;
                ace++;
            }
            score += value;
        });

        //check to see if ace should be 1 or 11
        while (score > 21 && ace > 0) {
            score -= 10;
            ace--;
        }
        return score;
    };



}