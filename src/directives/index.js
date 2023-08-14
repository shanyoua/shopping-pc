import { useIntersectionObserver } from '@vueuse/core'

// 定义懒加载
export const lazyPlugin = {
    install (app) {
        app.directive('img-lazy', {
            mounted (el, binding) {   // el:指令绑定的元素，binding: binding.value指令等于号后面绑定的表达式的值 图谱url
                const {stop} = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {   // 判断是否在视口中出现
                        console.log(isIntersecting)
                        if (isIntersecting) {
                            el.src = binding.value
                            stop()
                        }
                    }
                )
            }
        })
    }
}