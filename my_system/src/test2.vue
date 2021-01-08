<script>
function s (context) {
    switch (context.next) {
        case 0:
            context.next = 1;
            return 'red';
        case 1:
            context.next = 2;
            return 'yellow';
        case 2:
            context.next = 0;
            return 'green';
    }
};
const context = {
    next: 0,
    sent: null
};
const colorChange = {
    next (num) {
        context.sent = num;
        return {
            value: s(context),
            done: false
        };
    }
};

export default {
    data () {
        return {
            color: '#ccc'
        };
    },
    created () {
    },
    methods: {
        changeColor () {
            this.color = colorChange.next().value;
        },
        change (v) {

        }
    },
    render () {
        return (
            <div>
                <div style={{
                    width: '100px',
                    height: '100px',
                    marginBottom: '10px',
                    backgroundColor: this.color
                }} onClick={this.changeColor}></div>
                <a-input-number onChange={this.change}/>
            </div>
        );
    }
};
</script>