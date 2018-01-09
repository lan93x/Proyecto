<?php $__env->startSection('content'); ?>
<div class="ui container">
    <div class="ui middle aligned center aligned grid">
        <div class="six wide column">
            <h2 class="ui teal image header">
                <div class="content">
                    Regístrate
                </div>
            </h2>
            <form action="<?php echo e(route('register')); ?>" class="ui large form" method="POST">
                <?php echo e(csrf_field()); ?>

                <div class="ui stacked segment">
                    <div class="field<?php echo e($errors->has('fullname') ? ' has-error' : ''); ?>">
                        <div class="ui left icon input">
                            <i class="user icon">
                            </i>
                            <input autofocus="" id="fullname" name="fullname" placeholder=" nombre Completo" required="" type="name" value="<?php echo e(old('fullname')); ?>">
                                <?php if($errors->has('fullname')): ?>
                                <span class="help-block">
                                    <strong>
                                        <?php echo e($errors->first('fullname')); ?>

                                    </strong>
                                </span>
                                <?php endif; ?>
                            </input>
                        </div>
                    </div>
                    <div class="field<?php echo e($errors->has('email') ? ' has-error' : ''); ?>">
                        <div class="ui left icon input">
                            <i class="mail icon">
                            </i>
                            <input autofocus="" id="email" name="email" placeholder="E-mail" required="" type="email" value="<?php echo e(old('email')); ?>">
                                <?php if($errors->has('email')): ?>
                                <span class="help-block">
                                    <strong>
                                        <?php echo e($errors->first('email')); ?>

                                    </strong>
                                </span>
                                <?php endif; ?>
                            </input>
                        </div>
                    </div>
                    <div class="field<?php echo e($errors->has('password') ? ' has-error' : ''); ?>">
                        <div class="ui left icon input">
                            <i class="lock icon">
                            </i>
                            <input class="form-control" id="password" name="password" placeholder="contraseña" required="" type="password">
                                <?php if($errors->has('password')): ?>
                                <span class="help-block">
                                    <strong>
                                        <?php echo e($errors->first('password')); ?>

                                    </strong>
                                </span>
                                <?php endif; ?>
                            </input>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon">
                            </i>
                            <input class="form-control" id="password-confirm" name="password_confirmation" placeholder="repita su contraseña" required="" type="password">
                            </input>
                        </div>
                    </div>
                    <div class="field<?php echo e($errors->has('phone1') ? ' has-error' : ''); ?>">
                        <div class="ui left icon input">
                            <i class="user icon">
                            </i>
                            <input autofocus="" id="phone1" name="phone1" placeholder="telefono 1" required="" type="name" value="<?php echo e(old('phone1')); ?>">
                                <?php if($errors->has('phone1')): ?>
                                <span class="help-block">
                                    <strong>
                                        <?php echo e($errors->first('phone1')); ?>

                                    </strong>
                                </span>
                                <?php endif; ?>
                            </input>
                        </div>
                    </div>
                    <div class="field<?php echo e($errors->has('phone2') ? ' has-error' : ''); ?>">
                        <div class="ui left icon input">
                            <i class="user icon">
                            </i>
                            <input autofocus="" id="phone2" name="phone2" placeholder="telefono 2" required="" type="name" value="<?php echo e(old('phone2')); ?>">
                                <?php if($errors->has('phone2')): ?>
                                <span class="help-block">
                                    <strong>
                                        <?php echo e($errors->first('phone2')); ?>

                                    </strong>
                                </span>
                                <?php endif; ?>
                            </input>
                        </div>
                    </div>
                    <button class="ui fluid large teal submit button" type="submit">
                        Registrar
                    </button>
                    <a class="ui fluid facebook button margen-auth" href="<?php echo e(env('APP_URL')); ?>/auth/facebook">
                        <i class="facebook icon ">
                        </i>
                        Regístrate con Facebook
                    </a>
                    
                </div>
                <div class="ui error message">
                </div>
            </form>
            <div class="ui message">
                New to us?
                <a href="<?php echo e(env('APP_URL')); ?>/register">
                    Sign Up
                </a>
            </div>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>