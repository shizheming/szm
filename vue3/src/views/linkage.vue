<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { relationship } from "./relationship";
// import { relationship } from "hypnos-szm";
import {linkage, linkageRelationship}from './linkage'
export default {
  setup() {
    function a(v) {
      console.log(v++,"aaaaaaaaaaaaaavvvvvvvvvvvvvvvvvvvvvvv");
      return v;
    }
    function b(v) {
      console.log(v++,"b");
      return v;
    }
    function c(v) {
      console.log(v++,"c");
      return v;
    }
    function d(v) {
      console.log(v++,"d");
      return v;
    }
    function e(v) {
      console.log(v++,"e");
      return v;
    }
    function f() {
      console.log("fffffff");
    }
    
    let oo = {
      jj(){
        console.log(this.nn,'jjb')
      },
      nn:81111111111111118,
    }
    
    let s = relationship([
      {
        name: "a",
        relationship: {
          name: "f",
          relationship: "e",
          // relationship: "oo.jj",
        },
      },
      {
        name: "b",
        relationship: [
          {
            name: "f",
          },
          {
            name: "e",
            relationship:'c'
          },
        ],
      },
    ],{
      a,b,c,d,e,f,
      oo
    });
    /* let s = linkageRelationship([
      {
        name: "a",
        relationship: {
          name: "f",
          relationship: "e",
          // relationship: "oo.jj",
        },
      },
      {
        name: "b",
        relationship: [
          {
            name: "f",
          },
          {
            name: "e",
          },
        ],
      },
    ],{
      a,b,c,d,e,f,
      oo
    }); */
// s[0]()



    return () => {
      return "relationship";
    };
  },
};
</script>
