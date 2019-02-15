/**
 * Type definitions for wegame sub context
 * Project: https://developers.weixin.qq.com/minigame/dev/index.html
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 * Definitions by: J.C <https://github.com/jcyuan>
 * Reorganized by: Will Zhu <https://github.com/WillJoo>
 */

//声明全局变量
declare const canvas: wx.types.Canvas;

//声明全局函数

/**
 * 在下次进行重绘时执行
 * @param callback
 * @returns 请求 ID
 */
declare function requestAnimationFrame(callback: () => void): number;

/**
 * 取消一个先前通过调用 @function requestAnimationFrame 方法添加到计划中的动画帧请求
 * @param requestID 请求 ID
 */
declare function cancelAnimationFrame(requestID: number): void;

/**
 * 设定一个定时器。在定时到期以后执行注册的回调函数
 * @param callback 回调函数
 * @param delay 延迟的时间，函数的调用会在该延迟之后发生，单位 ms。
 * @param rest param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。
 * @return 定时器的编号。这个值可以传递给 clearTimeout 来取消该定时。
 */
declare function setTimeout(callback: () => void, delay: number, ...rest: any[]): number;
/**
 * 取消由 setTimeout 设置的定时器。
 * @param timeoutID 要取消的定时器的 ID
 */
declare function clearTimeout(timeoutID: number): void;
/**
 * 设定一个定时器。按照指定的周期（以毫秒计）来执行注册的回调函数
 * @param callback 回调函数
 * @param delay 执行回调函数之间的时间间隔，单位 ms。
 * @param rest param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。
 * @return 定时器的编号。这个值可以传递给 clearInterval 来取消该定时。
 */
declare function setInterval(callback: () => void, delay: number, ...rest: any[]): number;
/**
 * 取消由 setInterval 设置的定时器。
 * @param intervalID 要取消的定时器的 ID
 */
declare function clearInterval(intervalID: number): void;

declare namespace wx {
    namespace types {
        interface Touch {
            /**
             * Touch 对象的唯一标识符，只读属性
             * 一次触摸动作(我们值的是手指的触摸)在平面上移动的整个过程中, 该标识符不变。
             * 可以根据它来判断跟踪的是否是同一次触摸过程。
             */
            identifier: number;
            /**
             * 触点相对于屏幕左边沿的 X 坐标。
             */
            screenX: number;
            /**
             * 触点相对于屏幕左边沿的 Y 坐标。
             */
            screenY: number;
        }
        interface TouchEvent {
            /**
             * 当前所有触摸点的列表
             */
            touches: Touch[];
            /**
             * 触发此次事件的触摸点列表
             */
            changedTouches: Touch[];
            /**
             * 事件触发时的时间戳
             */
            timeStamp: number;
        }
    }
    /**
     * 监听开始始触摸事件
     */
    function onTouchStart(callback: (res: types.TouchEvent) => void): void;
    function offTouchStart(callback: (res: types.TouchEvent) => void): void;
    /**
     * 监听触点移动事件
     */
    function onTouchMove(callback: (res: types.TouchEvent) => void): void;
    function offTouchMove(callback: (res: types.TouchEvent) => void): void;
    /**
     * 监听触摸结束事件
     */
    function onTouchEnd(callback: (res: types.TouchEvent) => void): void;
    function offTouchEnd(callback: (res: types.TouchEvent) => void): void;
    /**
     * 监听触点失效事件
     */
    function onTouchCancel(callback: (res: types.TouchEvent) => void): void;
    function offTouchCancel(callback: (res: types.TouchEvent) => void): void;
}

declare namespace wx {
    namespace types {
        interface Response {
            /* 错误信息 */
            errMsg: string;
            /* 错误码 */
            errCode?: number;
        }
        interface CallbackParams<T extends Response = Response> {
            /**
             * 接口调用成功的回调函数
             */
            success?: (res: T) => void;
            /**
             * 接口调用失败的回调函数
             */
            fail?: (res: Response) => void;
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: (res: T) => void;
        }
    }
}

declare namespace wx {
    namespace types {
        interface ToTempFileSyncParams {
            /**
             * 截取 canvas 的左上角横坐标
             */
            x?: number;
            /**
             * 截取 canvas 的左上角纵坐标
             */
            y?: number;
            /**
             * 截取 canvas 的宽度
             */
            width?: number;
            /**
             * 截取 canvas 的高度
             */
            height?: number;
            /**
             * 目标文件的宽度，会将截取的部分拉伸或压缩至该数值
             */
            destWidth?: number;
            /**
             * 目标文件的高度，会将截取的部分拉伸或压缩至该数值
             */
            destHeight?: number;
            /**
             * 目标文件的类型
             */
            fileType?: "jpg" | "png";
            /**
             * jpg图片的质量，仅当 fileType 为 jpg 时有效。取值范围为 0.0（最低）- 1.0（最高），不含 0。不在范围内时当作 1.0
             */
            quality?: number;
        }
        interface ToTempFileParams extends ToTempFileSyncParams, CallbackParams<ToTempFileResponse> {
        }
        interface ToTempFileResponse extends Response {
            /**
             * canvas 生成的临时文件路径
             */
            tempFilePath: string;
        }
        interface RenderingContextConfig extends CanvasRenderingContext2DSettings {
            /**
             * 表示是否抗锯齿
             */
            antialias?: boolean;
            /**
             * 表示是否绘图完成后是否保留绘图缓冲区
             */
            preserveDrawingBuffer?: boolean;
            /**
             * 抗锯齿样本数。
             * 最小值为 2，最大不超过系统限制数量
             * 仅 iOS 支持
             */
            antialiasSamples?: number;
        }
        interface WebGLRenderingContext extends WebGLRenderingContextBase {
            /**
             * 将一个 Canvas 对应的 Texture 绑定到 WebGL 上下文。
             * @param texture WebGL 的纹理类型枚举值
             * @param canvas 需要绑定为 Texture 的 Canvas
             */
            wxBindCanvasTexture(texture: number, canvas: Canvas): void;
        }
        interface Canvas extends HTMLCanvasElement {
            /**
             * 画布的宽度
             */
            width: number;
            /**
             * 画布的高度
             */
            height: number;
            /**
             * 将当前 Canvas 保存为一个临时文件，并生成相应的临时文件路径。
             */
            toTempFilePath(p: ToTempFileParams): void;
            /**
             * toTempFilePath 的同步版本
             */
            toTempFilePathSync(p?: ToTempFileSyncParams): string;
            /**
             * 获取画布对象的绘图上下文
             * @param contextType 上下文类型
             * 
             * iOS/Android 不支持的 2d 属性和接口
             *   @property globalCompositeOperation 不支持以下值,如果使用，不会报错，但是将得到与预期不符的结果。
             *     @argument source-in
             *     @argument source-out
             *     @argument destination-atop
             *     @argument lighter
             *     @argument copy
             *   @function isPointInPath
             */
            getContext(contextType: "2d"): CanvasRenderingContext2D;
            /**
             * 获取画布对象的绘图上下文
             * @param contextType 上下文类型
             * @param contextAttributes webgl 上下文属性，仅当 @param contextType 为 @argument webgl 时有效
             * 
             * iOS/Android 不支持的 WebGL 接口
             *   @function pixelStorei 当第一个参数是 @argument gl.UNPACK_COLORSPACE_CONVERSION_WEBGL 时
             *   @function compressedTexImage2D
             *   @function compressedTexSubImage2D
             * 
             * 除此之外 Android 还不支持 WebGL 接口
             *   @function getExtension
             *   @function getSupportedExtensions
             */
            getContext(contextType: "webgl", contextAttributes: RenderingContextConfig): WebGLRenderingContext;
            /**
             * 把画布上的绘制内容以一个 data URI 的格式返回
             */
            toDataURL(): string;
        }
    }
    /**
     * 创建一个画布对象。首次调用创建的是显示在屏幕上的画布，之后调用创建的都是离屏画布。
     * @returns 画布对象
     */
    function createCanvas(): types.Canvas;
    /**
     * 获取主域和开放数据域共享的 sharedCanvas
     * 该接口只可在开放数据域下使用。
     */
    function getSharedCanvas(): types.Canvas;
}

declare namespace wx {
    namespace types {
        interface Image extends HTMLImageElement {
            /**
             * 图片的 URL
             */
            src: string;
            /**
             * 图片的真实宽度
             */
            width: number;
            /**
             * 图片的真实高度
             */
            height: number;
            /**
             * 图片加载完成后触发的回调函数
             */
            onload(): void;
            /**
             * 图片加载发生错误后触发的回调函数
             */
            onerror(): void;
        }
    }
    /**
     * 创建一个图片对象
     * @returns 图片对象
     */
    function createImage(): types.Image;
}

declare namespace wx {
    namespace types {
        interface UserInfo {
            /**
             * 用户 openId
             * 只在子域可用
             */
            openId?: string;
            /**
             * 用户昵称
             */
            nickName: string;
            /**
             * 用户头像图片 url
             */
            avatarUrl: string;
            /**
             * 用户性别
             * @argument 0 未知
             * @argument 1 男
             * @argument 2 女
             */
            gender: 0 | 1 | 2;
            /**
             * 用户所在国家
             */
            country: string;
            /**
             * 用户所在省份
             */
            province: string;
            /**
             * 用户所在城市
             */
            city: string;
            /**
             * 显示 country province city 所用的语言
             */
            language: string;
        }
        interface GetUserInfoParams extends CallbackParams<GetUserInfoResponse> {
            /**
             * 要获取信息的用户的 openId 数组，如果要获取当前用户信息，则将数组中的一个元素设为 'selfOpenId'
             */
            openIdList?: string[];
            /**
             * 显示用户信息的语言
             */
            lang?: "en" | "zh_CN" | "zh_TW";
        }
        interface GetUserInfoResponse extends Response {
            /**
             * 用户信息列表
             */
            data: UserInfo[];
        }
    }
    /**
     * 在无须用户授权的情况下，批量获取用户信息。该接口只在开放数据域下可用
     */
    function getUserInfo(params: types.GetUserInfoParams): void;
}

declare namespace wx {
    namespace types {
        interface KVData {
            /**
             * 数据的 key
             */
            key: string;
            /**
             * 数据的 value
             */
            value: any;
        }
        interface UserGameData {
            /**
             * 用户的微信头像 url
             */
            avatarUrl: string;
            /**
             * 用户的微信昵称
             */
            nickname: string;
            /**
             * 用户的openid
             */
            openid: string;
            /**
             * 用户的托管 KV 数据列表
             */
            KVDataList: KVData[];
        }
        interface GetCloudStorageParams {
            /**
             * 要拉取的 key 列表
             */
            keyList: string[],
        }
        interface GetFriendCloudStorageParams extends GetCloudStorageParams, CallbackParams<GetCloudStorageResponse> {
        }
        interface GetCloudStorageResponse extends Response {
            data: UserGameData[];
        }
        interface GetUserCloudStorageParams extends GetCloudStorageParams, CallbackParams<GetUserCloudStorageResponse> {
        }
        interface GetUserCloudStorageResponse extends Response {
            /**
             * 用户托管的 KV 数据列表
             */
            KVDataList: KVData[];
        }
        interface GetGroupCloudStorageParams extends GetFriendCloudStorageParams {
            /**
             * 群分享对应的 shareTicket
             */
            shareTicket: string,
        }
        interface RemoveUserCloudStorageParams extends GetCloudStorageParams, CallbackParams {
        }
        interface SetUserCloudStorageParams extends CallbackParams {
            /**
             * 要修改的 KV 数据列表
             */
            KVDataList: types.KVData[],
        }
    }
    /**
     * 拉取当前用户所有同玩好友的托管数据。
     * 该接口只可在开放数据域下使用
     * 支持版本 >= 1.9.92
     */
    function getFriendCloudStorage(params: types.GetFriendCloudStorageParams): void;
    /**
     * 获取当前用户托管数据当中对应 key 的数据。
     * 该接口只可在开放数据域下使用
     * 支持版本 >= 1.9.92
     */
    function getUserCloudStorage(params: types.GetUserCloudStorageParams): void;
    /**
     * 在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。
     * 该接口只可在开放数据域下使用。
     * 支持版本 >= 1.9.92
     */
    function getGroupCloudStorage(params: types.GetGroupCloudStorageParams): void;
    /**
     * 删除用户托管数据当中对应 key 的数据。
     * 支持版本 >= 1.9.92
     */
    function removeUserCloudStorage(params: types.RemoveUserCloudStorageParams): void;
    /**
     * 对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
     * 托管数据的限制
     *      > 每个openid所标识的微信用户在每个游戏上托管的数据不能超过128个key-value对。
     *      > 上报的key-value列表当中每一项的key+value长度都不能超过1K(1024)字节。
     *      > 上报的key-value列表当中每一个key长度都不能超过128字节。
     * 支持版本 >= 1.9.92
     */
    function setUserCloudStorage(params: types.SetUserCloudStorageParams): void;
}

declare namespace wx {
    /**
     * 监听主域发送的消息
     */
    function onMessage(callback: (data: any) => void): void;
}
