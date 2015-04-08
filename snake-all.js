function getElt(id){return document.getElementById(id);}
/**************************************************************
* javascript̰���� v2.4 <br />
* author: sunxing007  05/14/2009<br />
* ת����ע������http://blog.csdn.net/sunxing007 лл��<br />
* v2.4������������ɫ����������ǰ�����ƶ�
**************************************************************/
    //̰������
var Snake = {
    tbl: null,
    /**
     * body: ������������ߵ�ÿһ�ڣ�
     * ���ݽṹ{x:x0, y:y0, color:color0},
     * x,y��ʾ����,color��ʾ��ɫ
     **/
    body: [],
    //��ǰ�ƶ��ķ���,ȡֵ0,1,2,3, �ֱ��ʾ����,��,��,��, �����̷�������Ըı���
    direction: 0,
    //��ʱ��
    timer: null,
    //�ٶ�
    speed: 250,
    //�Ƿ��Ѿ���ͣ
    paused: true,
    //����
    rowCount: 30,
    //����
    colCount: 30,
    //��ʼ��
    init: function(){
        var colors = ['red','orange','yellow','green','blue','purple','#ccc'];
        this.tbl = getElt("main");
        var x = 0;
        var y = 0;
        var colorIndex = 0;
        //������ʼ�ƶ�����
        this.direction = Math.floor(Math.random()*4);
        //����table
        for(var row=0;row<this.rowCount;row++){
            var tr=this.tbl.insertRow(-1);
            for(var col=0;col<this.colCount;col++) {
                var td=tr.insertCell(-1);
            }
        }
        //����20����ɢ�ڵ�
        for(var i=0; i<10; i++){
            x = Math.floor(Math.random()*this.colCount);
            y = Math.floor(Math.random()*this.rowCount);
            colorIndex = Math.floor(Math.random()*7);
            if(!this.isCellFilled(x,y)){
                this.tbl.rows[y].cells[x].style.backgroundColor = colors[colorIndex];
            }
        }
        //������ͷ
        while(true){
            x = Math.floor(Math.random()*this.colCount);
            y = Math.floor(Math.random()*this.rowCount);
            if(!this.isCellFilled(x,y)){
                this.tbl.rows[y].cells[x].style.backgroundColor = "black";
                this.body.push({x:x,y:y,color:'black'});
                break;
            }
        }
        this.paused = true;
        //���Ӽ����¼�
        document.onkeydown= function(e){
            if (!e)e=window.event;
            switch(e.keyCode | e.which | e.charCode){
            case 13: {
                if(Snake.paused){
                    Snake.move();
                    Snake.paused = false;
                }
                else{
                    //���û����ͣ����ֹͣ�ƶ�
                    Snake.pause();
                    Snake.paused = true;
                }
                break;
            }
            case 37:{//left
                //��ֹ�ߵ�����
                if(Snake.direction==1){
                    break;
                }
                Snake.direction = 3;
                break;
            }
            case 38:{//up
                //��ݼ�������������
                if(event.ctrlKey){
                    Snake.speedUp(-20);
                    break;
                }
                if(Snake.direction==2){//��ֹ�ߵ�����
                    break;
                }
                Snake.direction = 0;
                break;
            }
            case 39:{//right
                if(Snake.direction==3){//��ֹ�ߵ�����
                    break;
                }
                Snake.direction = 1;
                break;
            }
            case 40:{//down
                if(event.ctrlKey){
                    Snake.speedUp(20);
                    break;
                }
                if(Snake.direction==0){//��ֹ�ߵ�����
                    break;
                }
                Snake.direction = 2;
                break;
            }
            }
        };
    },
    //�ƶ�
    move: function() {
        this.timer = setInterval(function(){
            Snake.erase();
            Snake.moveOneStep();
            Snake.paint();
        }, this.speed);
    },
    //�ƶ�һ������
    moveOneStep: function(){
        if(this.checkNextStep()==-1) {
            clearInterval(this.timer);
            alert("Game over!/nPress Restart to continue.");
            return;
        }
        if(this.checkNextStep()==1){
            var _point = this.getNextPos();
            var _x = _point.x;
            var _y = _point.y;
            var _color = this.getColor(_x,_y);
            this.body.unshift({x:_x,y:_y,color:_color});
            //��Ϊ����һ��ʳ������ٲ���һ��ʳ��
            this.generateDood();
            return;
        }
        //window.status = this.toString();
        var point = this.getNextPos();
        //������һ�ڵ���ɫ
        var color = this.body[0].color;
        //��ɫ��ǰ�ƶ�
        for(var i=0; i<this.body.length-1; i++){
            this.body[i].color = this.body[i+1].color;
        }
        //��β��һ�ڣ� ��β��һ�ڣ�������ǰ����Ч��
        this.body.pop();
        this.body.unshift({x:point.x,y:point.y,color:color});
        //window.status = this.toString();
    },
    //̽Ѱ��һ�����ߵ�ʲô�ط�
    pause: function(){
        clearInterval(Snake.timer);
        this.paint();
    },
    getNextPos: function(){
        var x = this.body[0].x;
        var y = this.body[0].y;
        var color = this.body[0].color;
        //����
        if(this.direction==0){
            y--;
        }
        //����
        else if(this.direction==1){
            x++;
        }
        //����
        else if(this.direction==2){
            y++;
        }
        //����
        else{
            x--;
        }
        //����һ������
        return {x:x,y:y};
    },
    //��齫Ҫ�ƶ�������һ����ʲô
    checkNextStep: function(){
        var point = this.getNextPos();
        var x = point.x;
        var y = point.y;
        if(x<0||x>=this.colCount||y<0||y>=this.rowCount){
            return -1;//���߽磬��Ϸ����
        }
        for(var i=0; i<this.body.length; i++){
            if(this.body[i].x==x&&this.body[i].y==y){
                return -1;//�����Լ�������,��Ϸ����
            }
        }
        if(this.isCellFilled(x,y)){
            return 1;//�ж���
        }
        return 0;//�յ�
    },
    //��������
    erase: function(){
        for(var i=0; i<this.body.length; i++){
            this.eraseDot(this.body[i].x, this.body[i].y);
        }
    },
    //��������
    paint: function(){
        for(var i=0; i<this.body.length; i++){
            this.paintDot(this.body[i].x, this.body[i].y,this.body[i].color);
        }
    },
    //����һ��
    eraseDot: function(x,y){
        this.tbl.rows[y].cells[x].style.backgroundColor = "";
    },
    paintDot: function(x,y,color){
        this.tbl.rows[y].cells[x].style.backgroundColor = color;
    },
    //�õ�һ�������ϵ���ɫ
    getColor: function(x,y){
        return this.tbl.rows[y].cells[x].style.backgroundColor;
    },
    //���ڵ���
    toString: function(){
        var str = "";
        for(var i=0; i<this.body.length; i++){
            str += "x:" + this.body[i].x + " y:" + this.body[i].y + " color:" + this.body[i].color + " - ";
        }
        return str;
    },
    //���һ���������û�б����
    isCellFilled: function(x,y){
        if(this.tbl.rows[y].cells[x].style.backgroundColor == ""){
            return false;
        }
        return true;
    },
    //���¿�ʼ
    restart: function(){
        if(this.timer){
            clearInterval(this.timer);
        }
        for(var i=0; i<this.rowCount;i++){
            this.tbl.deleteRow(0);
        }
        this.body = [];
        this.init();
        this.speed = 250;
    },
    //����
    speedUp: function(time){
        if(!this.paused){
            if(this.speed+time<10||this.speed+time>2000){
        	return;
            }
	    this.speed +=time;
	    this.pause();
	    this.move();
        }
    },
    //����ʳ�
    generateDood: function(){
        var colors = ['red','orange','yellow','green','blue','purple','#ccc'];
    	var x = Math.floor(Math.random()*this.colCount);
        var y = Math.floor(Math.random()*this.rowCount);
        var colorIndex = Math.floor(Math.random()*7);
        if(!this.isCellFilled(x,y)){
            this.tbl.rows[y].cells[x].style.backgroundColor = colors[colorIndex];
        }
    }
};